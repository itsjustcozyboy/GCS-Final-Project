'use client';

import { v4 as uuidv4 } from 'uuid';

const FD_ID_KEY = 'fd_id';
const SESSION_ID_KEY = 'session_id';

export function getFdId(): string {
  if (typeof window === 'undefined') return 'server';
  let id = localStorage.getItem(FD_ID_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(FD_ID_KEY, id);
  }
  return id;
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  let id = sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = uuidv4();
    sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}
