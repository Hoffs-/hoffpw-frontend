/**
 * Created by Hoffs on 2017-01-30.
 */
import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

export const serverUrl = 'https://api.hoff.pw';
