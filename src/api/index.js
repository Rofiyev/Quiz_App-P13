import { BASE_API_URL } from "@/constants";
import axios from "axios";

const DataFetching = {
  async postRegister(body) {
    try {
      const { data } = await axios.post(`${BASE_API_URL}/users/register`, body);
      return data && { success: true, msg: "Register Successfully", data };
    } catch (error) {
      console.log(error);
      const { email, password, username } = error.response.data;
      let msg =
        (email && email) || (password && password) || (username && username);
      return {
        success: false,
        msg: msg[0],
        data: {},
      };
    }
  },

  async verifyCode(body) {
    try {
      const { data } = await axios.post(
        `${BASE_API_URL}/users/activate-code`,
        body
      );
      return { success: true, msg: data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        msg: "Make sure the verification code is correct!",
      };
    }
  },

  async loginUser(body) {
    try {
      const { data } = await axios.post(`${BASE_API_URL}/users/login`, body);
      return { success: true, msg: "Sign In Successfully", data };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        msg: error.response.data.detail,
      };
    }
  },

  async getUser(token) {
    try {
      const { data } = await axios.get(`${BASE_API_URL}/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { data };
    } catch (error) {
      console.log(error);
      return { data: null };
    }
  },

  async sendMessage(body) {
    try {
      const { data } = await axios.post(
        `${BASE_API_URL}/quizes/send_mail`,
        body
      );
      return data && { msg: "Message sent successfully" };
    } catch (error) {
      console.log(error);
      return { msg: "" };
    }
  },

  async changeProfile(body, token) {
    try {
      const { data } = await axios.put(`${BASE_API_URL}/users/`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data && { success: true, data, msg: "Message saved successfully" };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: null,
        msg: "There was an error with the message!",
      };
    }
  },

  async resetPassword(email, token) {
    try {
      const { data } = await axios.post(
        `${BASE_API_URL}/users/reset-password`,
        email,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log();
      return data && { success: true, msg: data.detail };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        msg: "There was an error with the message!",
      };
    }
  },

  async confirmPassword(body, token) {
    try {
      const { data } = await axios.post(
        `${BASE_API_URL}/users/reset-password-confirm`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      return data && { success: true, msg: "Successfully converted!" };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        msg: "There was an error with the message!",
      };
    }
  },

  async getCategoryIDQuations(id, token) {
    try {
      const { data } = await axios.get(
        `${BASE_API_URL}/quizes/category/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data && { success: true, data };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        data: null,
      };
    }
  },
};

export default DataFetching;
