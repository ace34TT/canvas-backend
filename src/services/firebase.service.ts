import * as admin from "firebase-admin";
import path from "path";
const tempDirectory = path.resolve(__dirname, "../tmp/");
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "canvas-effa7",
    clientEmail: "firebase-adminsdk-qsoif@canvas-effa7.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYAzRLMptVDxIr\n1bVNjkFNExnVrcpQNEXqu4CC9jByX+O8TML3owYQm2kP5xvh7vGv0/5mCaBp8fgi\na+gfgXwTsTqk7huC+yk1A1kOtiOeu83O5OBHg7WZD+IRM/oxfXp9MG2nS+ShFK8U\nucTFjRZFND45QOSRKKFAx3ZLRB78Mv5ONKKDc+9sQyKnaQb26QjEtNiOK/8MWMZ2\nkVeaOL0DZZLW22bYvXLQtJ1beO3huHR7PGiCzESCKp26ApYxviRge6OpIOpqzlTn\ns9tObVZJKGMlczUMFPSLCjo6rEZV3S2IuFDm1nRNsg/uUqylKce0HNIemeWzMjJF\nuBUIphKlAgMBAAECggEAExjR9MF8kKzGRmIAdygQLZfg9r5wzG8ounLIVAuMLg48\nXL9S/gvJuwPfKMuKrfFYBRQPoW+DqtOmbeKbBHw+o3WwLaCpLaUSefG7+jRpGKu0\n0RFhWLKj+YDskGc0fwupu/j9yZbn99GSpjqpTP0qx1JnH8e2f0L4sRvt0UpTTzEC\nJ8uRFV1gz0Wrr9+JbDedT6SDXKGNiKvK1Dpt3LIfSnuB3BbjxTBUfndlLudfwSpQ\nfe9YBPpNAAG7Rc4skqdYmiCtIN9P5baKT1KpXGeXyAnCNd5qrpEYIL5r28rbU9Ai\nOD4Z50e+EECS7qBb+O1dyr7SEPwPoo02pWwUsSALkQKBgQDRruWFTty9oVw9pOro\nJ/e83t9zoJjvKIr6c0TrqCxkpdu//JX/ei+uOX1d6r1JQ/Zyof1xBYJyCc0DB2S+\n59StYj1eZxzVzhq/U+EXyAPSNeoI7io0i/9O5cOkkcq8DwhAzD3mWaFn19MJvrg6\n6LbHHgznPd1qcujT/izCN7uuVQKBgQC5lynWOqG21jJ94xLUvmJX8j7NBD6FjFft\n82LeSaeKai8jBClolF2ZOL/oFPN/WXt3hZAnMza/PLKqz4z4AxtimL7hbFIF+1wQ\nNtTdWJjxczRVJM3O5ifcm7iB/If8weaXsxX04dbJOJbrqDKou0PRp6pTV6IyLZSx\nmQ5u5RKDEQKBgQDN+mwXj0fCtI9DMw1bb1+q1plVIa76SK51puRORs8NM+zx5POI\nmwPZtznTF3RIU432P/ESpKHm2n/c+Ndbvasrg3Tblpk54pRd3M0iqmYuiq3ThfpJ\n0jjDzWtp75njMTUfSkOIVAX9V4NFcGfT3qUmZvuv8RLfre/PyEE5rLweXQKBgHHu\nQlipFa1QQR7WzzCaz3R92d+xw0/on/ILf55GSPvHw7gTTfhNXEg7dlPayMBdBlaR\nP7VQ00MC2AvT7g4ymhUk/8kS3ied7x5lCrf3M6zFtFKwjUd+MupTDil+BV09C3oF\nDm2OVnSgsMVqM+8xRqjl7MHNAl0bbjS4aQvaxEqBAoGALSS04DyS1j0DsFragbHN\nl6z3qBJ0cl6T//KRBW/d2zc7WawlpeELmj7ROEpUNkKCQ7QY8dtWRBYTUdqk7Xz3\nAN/gUmB7HssAr5YbtZD0AvM2gCnVLVsnImMNXJXqb6exppj1BqdfGW+9CQSOmBsr\nCqD+DbN2ZDp577+aNKT3uVE=\n-----END PRIVATE KEY-----\n",
  }),
  storageBucket: "gs://canvas-effa7.appspot.com",
});
export const uploadFileToFirebase = async (filename: string) => {
  const bucket = admin.storage().bucket();
  await bucket.upload(path.resolve(tempDirectory + "/" + filename), {
    destination: "results/" + filename,
  });
  const fileRef = bucket.file("results/" + filename);
  await fileRef.makePublic();
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
  return publicUrl;
};
export const deleteFile = async (filename: string) => {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file("canvas/" + filename);
    await file.delete();
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
export const getFile = async (filename: string) => {
  let bucket = admin.storage().bucket();
  let file = bucket.file("models/" + filename);
  // Fetch the download URL
  const url = await file.getSignedUrl({
    action: "read",
    expires: "03-09-2491",
  });
  return url[0];
};
