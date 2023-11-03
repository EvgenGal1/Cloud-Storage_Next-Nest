// пров.Авториз.на разных стр.
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import axios from '@/core/axios';
import * as Api from '@/api';

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
  //  берём Токен
  const { _token } = nookies.get(ctx);

  // Токен в headers req
  axios.defaults.headers.Authorization = 'Bearer ' + _token;

  // е/и от SRV нет ошб. остаёмся на "/dashboard"
  try {
    await Api.auth.getMe();

    return {
      props: {},
    };
  } catch (err) {
    // при ошб.с SRV переправ.на Форму Авториз.
    return {
      redirect: {
        destination: '/dashboard/auth',
        permanent: false,
      },
    };
  }
};
