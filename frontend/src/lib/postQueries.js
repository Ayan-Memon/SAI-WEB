import api from "./axios.instance";

export const getGalleryFolders = async () => {
  const res = await api.get("/post/get-folder-names");
  return res.data;
};

export const getPost = async (folderName) => {
  const res = await api.get(`/post/get-posts?folderName=${folderName}`);
  return res.data.data;
};

export const uploadFolder = async (data) => {
  const formData = new FormData();

  let { folderName, images } = data;

  folderName = folderName.trim();

  formData.append("folderName", folderName);

  images.forEach((image) => {
    formData.append("images", image);
  });
  const res = await api.post("/post/upload-posts", formData);
  return res.data;
};
