import { Subscription } from 'rxjs';

// 文件上传的设置选项
export interface UploaderOptions {
  concurrency: number;  // 并发性
  allowedContentTypes?: string[];   // 允许上传的文件类型
  maxUploads?: number;              // 允许一次上传的文件数量
  maxFileSize?: number;             // 允许上传的文件的大小
}

export interface BlobFile extends Blob {
  name: string;
}

// 上传状态
export enum UploadStatus {
  Queue,
  Uploading,
  Done,
  Cancelled
}

// 上传过程
export interface UploadProgress {
  status: UploadStatus;
  data?: {
    percentage: number;
    speed: number;
    speedHuman: string;
    startTime: number | null;
    endTime: number | null;
    eta: number | null;
    etaHuman: string | null;
  };
}

// 上传文件
export interface UploadFile {
  id: string;
  fileIndex: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  form: FormData;
  progress: UploadProgress;
  response?: any;
  responseStatus?: number;
  sub?: Subscription | any;
  nativeFile?: File;
  responseHeaders?: { [key: string]: string };
}

export interface UploadOutput {
  type: 'addedToQueue' | 'allAddedToQueue' | 'uploading' | 'done' | 'start' | 'cancelled' | 'dragOver'
      | 'dragOut' | 'drop' | 'removed' | 'removedAll' | 'rejected';
  file?: UploadFile;
  nativeFile?: File;
}

export interface UploadInput {
  type: 'uploadAll' | 'uploadFile' | 'cancel' | 'cancelAll' | 'remove' | 'removeAll';
  url?: string;
  method?: string;
  id?: string;
  fieldName?: string;
  fileIndex?: number;
  file?: UploadFile;
  data?: { [key: string]: string | Blob };
  headers?: { [key: string]: string };
  includeWebKitFormBoundary?: boolean; // If false, only the file is send trough xhr.send (WebKitFormBoundary is omit)
  withCredentials?: boolean;
}
