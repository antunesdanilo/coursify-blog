import BaseService from './base.service';

class PostService extends BaseService {
  listCategories(): Promise<Response> {
    return this.get('/categories');
  }

  listPosts(categoryId: number): Promise<Response> {
    return this.get(`/posts?categories=${categoryId}`);
  }

  viewPost(postId: number): Promise<Response> {
    return this.get(`/posts/${postId}`);
  }

  viewMidia(midiaId: number): Promise<Response> {
    return this.get(`/media/${midiaId}`);
  }
}

const postService = new PostService();
export default postService;
