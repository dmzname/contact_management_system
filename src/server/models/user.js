import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		passwordHash: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model('User', UserSchema);
