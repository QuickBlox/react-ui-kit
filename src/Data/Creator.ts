import ChatMessageAttachmentEntity from '../Domain/entity/ChatMessageAttachmentEntity';
import { DialogType } from '../Domain/entity/DialogTypes';
import { MessageEntity } from '../Domain/entity/MessageEntity';
import { FileEntity } from '../Domain/entity/FileEntity';
import { FileType } from '../Domain/entity/FileTypes';
import { getQB } from '../qb-api-calls';

export type MessageEntityParams = {
  id?: string;
  dialogId: string;
  message: string;
  created_at?: string;
  date_sent?: number;
  updated_at?: string;
  delivered_ids?: Array<number>;
  read_ids?: Array<number>;
  read?: number;
  sender_id: number;
  recipient_id: number;
  attachments?: ChatMessageAttachmentEntity[];
  notification_type?: string;
  dialog_type?: DialogType;
};

export class Creator {
  public static createPhotoByBlob = async (blob_id: number | string | null) => {
    const QB = getQB();
    const fileId = (blob_id as number) || 0;

    const file_uid: string = await Creator.getInfoPromise(fileId);

    const imageSrc = QB.content.privateUrl(file_uid);
    const { imgSrc, blobFile } = await Creator.createBlobFromUrl(imageSrc);

    //
    return blobFile ? URL.createObjectURL(blobFile) : imgSrc || '';
  };

  public static async createBlobFromUrl(imageSrc: string) {
    let imgSrc = '';
    //
    const setBlob = async function (response: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const blob: Blob = await response?.blob();

      imgSrc = URL.createObjectURL(blob);
    };

    const blobFile = await fetch(imageSrc)
      .catch(async function () {
        const response = await fetch(imageSrc);

        if (response.ok) {
          await setBlob(response);
        }
      })
      // eslint-disable-next-line promise/always-return
      .then(function (response) {
        return response?.blob();
      });

    return { imgSrc, blobFile };
  }

  private static async getInfoPromise(fileId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const QB = getQB();

      QB.content.getInfo(fileId, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result!.blob.uid);
        }
      });
    });
  }

  static createMessageEntity(params: MessageEntityParams): MessageEntity {
    return {
      id: params.id || '',
      dialogId: params.dialogId,
      message: params.message,
      created_at: params.created_at || new Date().toISOString(),
      date_sent: params.date_sent || Date.now(),
      updated_at: params.updated_at || new Date().toISOString(),
      delivered_ids: params.delivered_ids || [],
      read_ids: params.read_ids || [],
      read: params.read || 1,
      sender_id: params.sender_id,
      recipient_id: params.recipient_id,
      attachments: params.attachments,
      notification_type: params.notification_type,
      dialogType: params.dialog_type,
    };
  }

  public static createFileEntity(): FileEntity {
    return {
      id: '0',
      uid: '',
      url: '',
      name: '',
      size: 0,
      type: FileType.image,
    };
  }
}
