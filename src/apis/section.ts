import axios from 'axios';

import { APIReturnType, RequestTypeSection, RestReturnType, RestReturnTypeDelete } from './types';
import { ACCESS_TOKEN } from '../constants/storage';
import STATUS_CODE from '../constants/statusCode';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/messages';
import { unauthorizedDeleteResult, unauthorizedResult } from './sharedResults';

const sectionAPI = {
  post: async (
    lineId: number,
    data: RequestTypeSection
  ): Promise<APIReturnType<RestReturnType | null>> => {
    try {
      if (!ACCESS_TOKEN) {
        return unauthorizedResult;
      }

      const { status } = await axios.post(`/lines/${lineId}/sections`, data, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (status !== STATUS_CODE.CREATED) {
        if (status === STATUS_CODE.UNAUTHORIZED) {
          return unauthorizedResult;
        }

        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.ADD_SECTION,
        result: null,
      };
    } catch (error) {
      console.error(error);

      return {
        isSucceeded: true,
        message: ERROR_MESSAGE.DEFAULT,
        result: null,
      };
    }
  },

  delete: async (
    lineId: number,
    stationId: number
  ): Promise<APIReturnType<RestReturnTypeDelete | null>> => {
    try {
      if (!ACCESS_TOKEN) {
        return unauthorizedDeleteResult;
      }

      const { status } = await axios.delete(`/lines/${lineId}/sections?stationId=${stationId}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (status !== STATUS_CODE.NO_CONTENT) {
        if (status === STATUS_CODE.UNAUTHORIZED) {
          return unauthorizedDeleteResult;
        }

        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.DELETE_LINE,
        result: null,
      };
    } catch (error) {
      console.error(error);

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DEFAULT,
        result: null,
      };
    }
  },
};

export default sectionAPI;
