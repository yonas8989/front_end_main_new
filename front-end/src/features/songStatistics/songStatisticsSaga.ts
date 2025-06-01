// src/features/statistics/statisticsSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { fetchStatisticsRequest, fetchStatisticsSuccess, fetchStatisticsFailure } from './songStatisticsSlice';
import { api } from '../../api/apiClient';
import { ApiResponse } from '../../types/api';
import { SongStats } from '../../types/song';

function* handleFetchStatistics() {
  try {
    const response: ApiResponse<{ stats: SongStats }> = yield call(api.get, '/songs/stats');

    if (response.status === 'SUCCESS') {
      yield put(fetchStatisticsSuccess(response.data.stats));
    } else {
      throw new Error(response.message || 'Failed to fetch statistics');
    }
  } catch (error) {
    console.error('Fetch statistics error:', error);
    let errorMessage = 'Failed to fetch statistics';

    if (error instanceof AxiosError && error.response?.data) {
      const apiResponse: ApiResponse<{}> = error.response.data;
      errorMessage = apiResponse.message || 'Failed to fetch statistics';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(fetchStatisticsFailure(errorMessage));
  }
}

export default function* statisticsSaga() {
  yield takeEvery(fetchStatisticsRequest.type, handleFetchStatistics);
}