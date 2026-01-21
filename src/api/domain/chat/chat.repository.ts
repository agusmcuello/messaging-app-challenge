import { HttpService } from "../../baseRepositories/api/http/axios/axios-http-service";
import ApiRepository from "../../baseRepositories/api/respository";
import { RequestData } from "../../http/Http";
import Paginated from "../../types/paginated";

export default class ChatRepository extends ApiRepository {
  constructor() {
    super("messages");
  }

  public async getEvents<T>(
    limit: number,
    offset: number
  ): Promise<Paginated<T>> {
    const data: RequestData = {
      endpoint: `${this.endpoint}`,
      params: { limit, offset },
    };

    return HttpService.getAsync(data);
  }

  public async sendTextMessage<T>(text: string): Promise<T> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/send-text`,
      body: { text },
    };

    return HttpService.postAsync(data);
  }

  public async sendImageMessage<T>(imageUri: string): Promise<T> {
    const formData = new FormData();

    const cleanUri = imageUri.startsWith("file://")
      ? imageUri
      : `file://${imageUri}`;

    const fileToUpload = {
      uri: cleanUri,
      name: "photo.jpg",
      type: "image/jpeg",
    };

    // @ts-ignore
    formData.append("image", fileToUpload);

    const data: RequestData = {
      endpoint: `${this.endpoint}/send-image`,
      body: formData,
    };

    return HttpService.postAsync(data);
  }
}
