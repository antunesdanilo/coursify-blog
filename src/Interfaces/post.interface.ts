export default interface PostInterface {
  id: number;
  title: {rendered: string};
  content: {rendered: string};
  featured_media: number;
  page_views: number;
}
