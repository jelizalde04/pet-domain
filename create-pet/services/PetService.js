const axios = require('axios');
const Pet = require('../models/Pet');
const { petDb } = require("../config/db");
require("dotenv").config();

/**
 * Uploads a pet image to AWS S3 and returns the public URL.
 * Uses the pet's ID to generate a unique filename.
 * 
 * @param {Object} file - Multer file object containing buffer and metadata.
 * @param {string} petId - Unique identifier for the pet.
 * @returns {Promise<string>} Publicly accessible S3 URL of the uploaded image.
 * @throws {Error} If file is missing or upload fails.
 */
const uploadPetImageToS3 = async (file, petId) => {
  if (!file || !file.buffer) {
    throw new Error("No file available for upload.");
  }

  const fileName = `${petId}_image.jpg`;
  const uploadUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/pet_profile/${fileName}`;

  try {
    const response = await axios.put(uploadUrl, file.buffer, {
      headers: {
        'Content-Type': file.mimetype,
      },
    });

    if (response.status === 200) {
      return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/pet_profile/${fileName}`;
    }
    throw new Error('Failed to upload image to S3');
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error(`S3 upload failed: ${error.message}`);
  }
};

/**
 * Creates a new pet profile with image upload handling.
 * Performs atomic operations: DB record creation + S3 upload in a transaction.
 * 
 * @param {Object} petData - Pet metadata including Multer file object.
 * @param {string} authenticatedUserId - Owner's user ID from JWT.
 * @returns {Promise<Pet>} The created pet record with image URL.
 * @throws {Error} With status codes for:
 *   - 400 (Missing name, duplicate pet, or invalid owner)
 *   - 500 (Server/S3 errors)
 */
const createPet = async (petData, authenticatedUserId) => {
  const { name, file } = petData;

  // Validate required fields
  if (!name) {
    const error = new Error("Pet name is required.");
    error.status = 400;
    throw error;
  }

  const responsibleId = authenticatedUserId;
  if (!responsibleId) {
    const error = new Error("Invalid owner ID.");
    error.status = 400;
    throw error;
  }

  // Check for existing pet with same name for owner
  const existingPet = await Pet.findOne({
    where: { name, responsibleId }
  });

  if (existingPet) {
    const error = new Error("You already have a pet with this name.");
    error.status = 400;
    throw error;
  }

  // Start atomic transaction
  const transaction = await petDb.transaction();
  try {
    // Phase 1: Create base pet record
    const pet = await Pet.create({
      ...petData,
      responsibleId,
      image: null // Placeholder for S3 URL
    }, { transaction });

    // Phase 2: Upload image to S3
    const imageUrl = await uploadPetImageToS3(file, pet.id);

    // Phase 3: Update record with image URL
    pet.image = imageUrl;
    await pet.save({ transaction });

    await transaction.commit();
    console.log(`Successfully created pet: ${pet.id}`);
    return pet;
  } catch (error) {
    // Rollback on any failure
    await transaction.rollback();
    console.error("Pet creation error: ", error);
    error.status = error.status || 500;
    throw error;
  }
};

module.exports = { createPet, uploadPetImageToS3 };