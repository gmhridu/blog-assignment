import mongoose, { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public Query: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(Query: Query<T[], T>, query: Record<string, unknown>) {
    this.Query = Query;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this.query?.search;

    if (search) {
      this.Query = this.Query.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: {
                $regex: search,
                $options: 'i',
              },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const copyObj = { ...this.query };

    const filtering = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
    ];

    filtering.forEach((el) => delete copyObj[el]);

    if (copyObj['filter']) {
      copyObj['author'] = new mongoose.Types.ObjectId(
        copyObj['filter'] as string,
      );
      delete copyObj['filter'];
    }

    this.Query = this.Query.find(copyObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sortBy = (this?.query?.sortBy as string) || 'createdAt';
    const sortOrder = this?.query?.sortOrder === 'desc' ? '-' : '';
    const sortQuery = `${sortOrder}${sortBy}`;

    this.Query = this.Query.sort(sortQuery);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 6;
    const skip = (page - 1) * limit;

    this.Query = this.Query.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';

    this.Query = this.Query.select(fields);

    return this;
  }
}

export default QueryBuilder;
