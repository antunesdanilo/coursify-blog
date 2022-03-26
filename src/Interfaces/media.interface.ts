export default interface MediaInterface {
  id: number;
  media_details: {
    sizes: {
      medium: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}
