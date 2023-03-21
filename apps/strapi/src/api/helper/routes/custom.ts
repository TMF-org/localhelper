/**
 * helper router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/helpers/for-map',
      handler: 'helper.findForMap',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/helpers/by-distance',
      handler: 'helper.findByDistance',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/helpers/me',
      handler: 'helper.findMe',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/helpers/me',
      handler: 'helper.updateMe',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/helpers/:url',
      handler: 'helper.findByUrl',
      config: {
        policies: [],
      },
    },

    {
      method: 'POST',
      path: '/onboarding',
      handler: 'helper.onboarding',
      config: {
        policies: [],
      },
    },
  ],
};
