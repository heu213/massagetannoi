import { S3_BUCKET } from "../config";

function uploadFileToS3(data:any, link:any) {
  const myArrayAsString = JSON.stringify(data);
  const params = {
    Bucket: S3_BUCKET,
    Key: link,
    Body: myArrayAsString,
  };

  s3.upload(params, function (err:any, uploadData:any) {
    if (err) {
      console.log(err);
    } else {
      console.log('File uploaded successfully!');
    }
  });
}

function convertStr(strArr: any) {
  switch (strArr.length) {
    case 3:
      return `${strArr[0]}/${strArr[1]}/${strArr[2]}`;
    case 2:
      return `01/${strArr[0]}/${strArr[1]}`;
    case 1:
      return strArr[0] ? `01/01/${strArr[0]}` : '';
    default:
      return '';
  }
}

export default {
  uploadFileToS3,
  convertStr
}
