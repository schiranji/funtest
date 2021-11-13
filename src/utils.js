import axios from "axios";
import { date } from "yup";
import styled from "styled-components";
import join from "url-join";

const port = window.location.port;

export const requestBase = axios.create({
  withCredentials: true,
});

requestBase.interceptors.request.use((config) => {
  var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

  if (typeof tokenName !== "undefined") {
    let newParams = { ...config.params };
    config.params = newParams;
  }
  return config;
});

requestBase.interceptors.response.use(
  (e) => e,
  (err) => {
    console.log(err);
    if (err.response === undefined || err.response.status === 401) {
      window.location.replace("/event/manageEvent/login");
    }
    return Promise.reject(err);
  }
);

export const handleWithAnyFunction = (handler, whenAny, value = true) => {
  return (params) => {
    whenAny(value);
    handler(params);
  };
};

export const formatTimeToServer = function (date) {
  /*var dateStr = date.toISOString().replace(/-|:|\.\d+/g, '');*/
  var dateStr = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
  return dateStr.substr(0, dateStr.length - 1);
};

export const formatTimeFromServer = function (date) {
  /*var dateStr = date.toISOString().replace(/-|:|\.\d+/g, '');*/
  var dateStr = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  ).toISOString();
  return dateStr;
};

export const combineDateAndTime = function (date, time) {
  const timeString = time.getHours() + ":" + time.getMinutes() + ":00";

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Jan is 0, dec is 11
  const day = date.getDate();
  const dateString = "" + year + "-" + month + "-" + day;
  const combined = new Date(dateString + " " + timeString);

  return combined;
};

export const getEventDetailUrl = (event) => {
  if (event.canonicalUrl) return event.canonicalUrl;
  return `https://funzippy.com/event/${event.id}/${event.uid}`;
};

export const getGroupEventDetailUrl = (event) => {
  if (event.canonicalUrl) return event.canonicalUrl;
  return `https://funzippy.com/grpEvent/${event.id}/${event.uid}`;
};

export const regularNavItems = [
  {
    title: "Basic Details",
    itemId: "basic",
  },
  {
    title: "Event Dashboard",
    itemId: "dashboard",
    subNav: [
      {
        title: "Event contacts",
        itemId: "contacts",
      },
      {
        title: "Event tasks",
        itemId: "tasks",
      },
      {
        title: "Event Schedule",
        itemId: "schedule",
      },
      {
        title: "Event Management Team",
        itemId: "team",
      },
    ],
  },
  {
    title: "Media",
    itemId: "media",
  },
  {
    title: "Guests and Invitations",
    itemId: "guests",
  },
  {
    title: "Potluck Menu",
    itemId: "potluck",
  },
  {
    title: "Time Slots",
    itemId: "timeslots",
  },
  {
    title: "Ticketing and RSVP",
    itemId: "ticketing",
  },
  {
    title: "Participants and featured guests",
    itemId: "participants",
  },
  {
    title: "Sponsorship and booth sales",
    itemId: "sponsors",
  },
  {
    title: "Accomodations",
    itemId: "accomodations",
  },
];

export const groupNavItems = [
  {
    title: "Basic Details",
    itemId: "basic",
  },
  {
    title: "Event Dashboard",
    itemId: "dashboard",
    subNav: [
      {
        title: "Event contacts",
        itemId: "contacts",
      },
      {
        title: "Event tasks",
        itemId: "tasks",
      },
      {
        title: "Event Schedule",
        itemId: "schedule",
      },
      {
        title: "Event Management Team",
        itemId: "team",
      },
    ],
  },
  {
    title: "Media",
    itemId: "media",
  },
  {
    title: "Guests and Invitations",
    itemId: "guests",
  },
  {
    title: "Ticketing and RSVP",
    itemId: "ticketing",
  },
  {
    title: "Potluck Menu",
    itemId: "potluck",
  },
  {
    title: "Gift Registry",
    itemId: "registry",
  },
  {
    title: "Time Slots",
    itemId: "timeslots",
  },
  {
    title: "Participants and featured guests",
    itemId: "participants",
  },
  {
    title: "Sponsorship and booth sales",
    itemId: "sponsors",
  },
  {
    title: "Accomodations",
    itemId: "accomodations",
  },
];

export const HiddenRow = styled.div`
  display: none;
`;

export const EVENT_TYPE = {
  group: "group",
  regular: "regular",
  private: "private",
};

export const COUNTRY_TYPE = {
  US: "+1",
  IN: "+91",
};

export const ATTENDANCE_TYPE = {
  inPerson: "InPerson",
  online: "Online",
  mixed: "Mixed",
};

export const radioOverrides = {
  Description: {
    style: ({ $theme }) => {
      return {
        marginTop: "-10px",
        marginBottom: "5px",
      };
    },
  },
};
