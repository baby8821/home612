<template>
  <div id="selectFile">
    <div class="title">编辑头像</div>
    <div class="show">
      <div class="both">
        <div class="operate">
          <img :src="fileUrl" alt="" />
        </div>
        <div class="preview"></div>
      </div>
    </div>
    <div class="ensure">
      <button class="cancel" @click="cancel">取消</button>
      <button class="upload" @click="upload">确定</button>
    </div>
  </div>
</template>

<script>
import request from "@/api";
export default {
  name: "uploadAvatar",
  data() {
    return {};
  },
  props: ["updateAvatar"],
  mounted() {},
  computed: {
    file() {
      return this.$store.state.uploadImg;
    },
    fileUrl() {
      if (this.file) {
        return URL.createObjectURL(this.file);
      }
    },
  },
  methods: {
    upload() {
      // 创建一个 FromData 对象
      let forms = new FormData();
      // 添加 file 和 userName 属性
      forms.append("file", this.file);
      // 提交更换图片请求
      request
        .post("/avatar/upload", forms, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("upload avatar response", res);
          if (res.isOK) {
            console.log("upload success");
            this.$store.commit("CHANGE", false);
            this.$store.commit("DELUPLOADIMG");
            this.updateAvatar(res.avatarPath);
          }
        });
    },
    cancel() {
      this.$store.commit("CHANGE", false);
      this.$store.commit("DELUPLOADIMG");
    },
    addMask() {
      let img = document.querySelector(".operate > img");
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      console.dir(img);
    },
  },
  watch: {
    file() {
      this.addMask();
    },
  },
};
</script>

<style scoped lang="less">
#selectFile {
  width: 100%;
  height: 100%;
  box-shadow: #ccc 0px 0px 10px;
  overflow: hidden;

  .title {
    height: 55px;
    width: 100%;
    line-height: 55px;
    font-size: 18px;
    text-align: left;
    padding-left: 30px;
    border-bottom: 1px solid #ccc;
  }

  .show {
    box-sizing: border-box;
    width: 100%;
    height: 416px;
    padding: 24px;

    .both {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .operate {
        width: 320px;
        height: 320px;
        background-color: orange;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .preview {
        width: 120px;
        height: 120px;
        background-color: pink;
      }
    }
  }

  .ensure {
    width: 100%;
    height: 53px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    button {
      width: 60px;
      height: 32px;
      margin: 0 20px;
      cursor: pointer;
      transition: all 0.5s;
      border-radius: 5px;
      font-size: 16px;
    }

    .cancel {
      border: 1px solid #ccc;
      background-color: #fff;

      &:hover {
        color: rgb(221, 49, 49);
        border: 1px solid rgb(221, 35, 35);
      }
    }
    .upload {
      background-color: rgba(36, 221, 36, 0.767);
      border: none;
      color: #fff;
      &:hover {
        color: white;
        background-color: rgb(31, 247, 31);
      }
    }
  }
}
</style>