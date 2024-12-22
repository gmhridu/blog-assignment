import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre('save', async function (next) {
  try {
    const author = await User.findById(this.author);

    if (!author) {
      return next(new AppError(400, 'Author does not exists!'));
    }

    if (author.isBlocked) {
      return next(
        new AppError(403, 'Cannot post: The author is either blocked.'),
      );
    } else if (author.isDeleted) {
      return next(new AppError(403, 'Cannot post: The author is deleted.'));
    }

    if (author.isBlocked && author.isDeleted) {
      return next(
        new AppError(
          403,
          'Cannot post: The author is either blocked or deleted.',
        ),
      );
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export const Blog = model<TBlog>('Blog', blogSchema);
