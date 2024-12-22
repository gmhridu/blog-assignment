import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Set empty string as a password after save
adminSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Exclude deleted records in queries
adminSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

adminSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

adminSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: false } });
});

// Static method to check if an admin user exists
adminSchema.statics.isUserExist = async function (email: string) {
  return await Admin.findOne({ email });
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
