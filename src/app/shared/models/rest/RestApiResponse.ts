import { HttpStatusCode } from '@angular/common/http';
import { ErrorDetails } from './ErrorDetails';
import { SuccessDetails } from './SuccessDetails';

export interface RestApiResponse<T> {
  message: string;
  status: string;
  success: SuccessDetails<T>;
  error: ErrorDetails;
}
