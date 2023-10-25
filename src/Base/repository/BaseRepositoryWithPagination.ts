import BaseRepository from './BaseRepository';

export default abstract class BaseRepositoryWithPagination<
  T,
  IdType = number,
> extends BaseRepository<T, IdType> {
  abstract findAndCount(skip: number, take: number): Promise<[T[], number]>;
}
