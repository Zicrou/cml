export type User = {
  demographicImage: any;
  personName: string;
  dateOfBirth: string | Date;
  previouslyMarried: string;
  attendedEvents: number;
  lookingFor: string;
  sys: any;
};

export type UsersListingView = {
  users: User[];
  menCount: number;
  womenCount: number;
};
export interface ChartsComponentProps {
  chartsData: any;
};
export interface mapComponentProps {
  address: string;
};
export interface MatchlistComponentProps {
  matches: string[];
  eventId: string;
  history: any;
};
export interface CreateEventComponentProps {
  addressTracker: any;
  isEventAddress: boolean;
};
export interface UserlistComponentProps {
  users: string[];
};
export interface ChlidrenQuestionnaireProps {
  childrenState: any
};
export interface FinanceQuestionnaireProps {
  financeState: any
};
 export interface LifestyleComponentProps {
  lifeStyleState: any
}
export interface RelationshipQuestionnaireProps {
  relationshipState: any
};
export interface UserlistComponentProps {
  users: string[];
};
export interface CreateEventProps {
  eventDateTime: string;
  eventAddress: string;
  eventDate: string;
  eventFee: string;
  eventName: string;
  eventTime: string;
  eventType: string;
};
export interface GetFutureEventProps {
  eventId: string;
};

export interface GetPastEventProps {
  eventId: string;
};
export interface GetEventProps {
  eventStatus: string;
};
export interface GetEventExpiredProps {
  eventStatus: string;
};
export interface UpdateEventProps {
  eventDateTime: string;
  eventAddress: string;
  eventName: string;
  eventDate: string
  eventTime: string;
  eventId: string;
  eventFee: string;
  eventType: string;  
};
export interface pdfProp {
  menData: string;
  womenData: string;
  eventId: string;
};
export interface InviteProps {
  userEmail: string;
  subject?: string | any;
  body?: string | any;
  eventId: string;
  eventDateTime?: string | null | any;
};
export interface userProps {
  url?: string;
  status: boolean;
};
export interface UpdateInviteProps {
  eventId: string;
};
export interface MatchEventProps {
  notifiedMemberId: string;
  message: string;
  subject: string;
  matchId: string;
  eventId: string;
}
export interface sessionProps {
  credentials: {
    accessToken: string;
    idToken: string;
    refreshToken: string;
  };
  user: {
    userName: string;
    email: string;
  };
  isAdmin: boolean;
}
export interface GetUserProps {
  url?: string;
  status: boolean;
};
export interface InvitedUser {
  attendedEvents: number;
  dateOfBirth: string | Date;
  email: string;
  lookingFor: string;
  personName: string;
  previouslyMarried: string;
  sys: { id: string };
}
export interface ListUserRowProps {
  user: User;
};
export interface SendInvitationUserProps {
  dateOfBirth: "2002-11-04";
  email: string;
  eventInvitations: number;
  eventMemberships: number;
  invitationCode: string;
  lookingFor: string;
  personName: string;
  previouslyMarried: string;
  status: string;
  sys: { id: string; updatedAt: number };
}
export interface UninviteUserProps {
  attendedEvents: number;
  dateOfBirth: string | Date;
  email: string;
  lookingFor: string;
  personName: string;
  previouslyMarried: string;
  sys: { id: string };
};
export interface UpdateEventComponentProps {
  addressTracker: any;
  isEventAddress: boolean;
}
export interface RouteParams {
  eventId: string
}