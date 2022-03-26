import PostInterface from './post.interface';

export default interface CategoryInterface {
  id: number;
  name: string;
  posts: PostInterface[];
  views: number;
}
