import ko_common from '../locales/ko/common.json';
import en_common from '../locales/en/common.json';
import ko_onboarding from '../locales/ko/onboarding.json';
import en_onboarding from '../locales/en/onboarding.json';
import ko_feed from '../locales/ko/feed.json';
import en_feed from '../locales/en/feed.json';
import ko_today from '../locales/ko/today.json';
import en_today from '../locales/en/today.json';
import ko_book from '../locales/ko/book.json';
import en_book from '../locales/en/book.json';
import ko_profile from '../locales/ko/profile.json';
import en_profile from '../locales/en/profile.json';
import ko_legal from '../locales/ko/legal.json';
import en_legal from '../locales/en/legal.json';
import ko_faq from '../locales/ko/faq.json';
import en_faq from '../locales/en/faq.json';
import ko_inquiry from '../locales/ko/inquiry.json';
import en_inquiry from '../locales/en/inquiry.json';
import ko_admin from '../locales/ko/admin.json';
import en_admin from '../locales/en/admin.json';
import ko_auth from '../locales/ko/auth.json';
import en_auth from '../locales/en/auth.json';
import ko_errors from '../locales/ko/errors.json';
import en_errors from '../locales/en/errors.json';

export const resources = {
  ko: {
    common: ko_common,
    onboarding: ko_onboarding,
    feed: ko_feed,
    today: ko_today,
    book: ko_book,
    profile: ko_profile,
    legal: ko_legal,
    faq: ko_faq,
    inquiry: ko_inquiry,
    admin: ko_admin,
    auth: ko_auth,
    errors: ko_errors,
  },
  en: {
    common: en_common,
    onboarding: en_onboarding,
    feed: en_feed,
    today: en_today,
    book: en_book,
    profile: en_profile,
    legal: en_legal,
    faq: en_faq,
    inquiry: en_inquiry,
    admin: en_admin,
    auth: en_auth,
    errors: en_errors,
  },
} as const;

export type Resources = typeof resources;
