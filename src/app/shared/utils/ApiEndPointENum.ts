export enum ApiEndPointEnum {
  ROHINGYA_PROFILE_SEARCH_API = 'ROHINGYA_PROFILE_SEARCH',

  ROHINGYA_AFIS_GENERATE_JOB = 'ROHINGYA_AFIS_SEARCH_JOB',

  BIRTH_REGISTRATION_SEARCH = 'BIRTH_REGISTRATION_SEARCH',

  NID_SEARCH = 'NID_SEARCH',

  PASSPORT_SEARCH = 'PASSPORT_SEARCH',

  VEHICLE_REGISTRATION_SEARCH = 'VEHICLE_REGISTRATION_SEARCH',

  STUDENT_SEARCH = 'STUDENT_SEARCH',

  ESAF_SEARCH = 'ESAF_SEARCH',

  FINANCE_DIVISION_SEARCH = 'FINANCE_DIVISION_SEARCH',

  UNIFIED_PROFILING_SEARCH = 'UNIFIED_PROFILING_SEARCH',

  NBR_SEARCH = 'NBR_SEARCH',

  BRTA_DRIVING_LICENSE_SEARCH = 'BRTA_DRIVING_LICENSE_SEARCH',

  NEIR_SEARCH = 'NEIR_SEARCH',

  LD_TAX_SEARCH = 'LD_TAX_SEARCH',
}
export class ApiEndPointEnumValue {
  private accessName: string;
  private apiEndPoint: string;

  private static enumValueMap: Map<string, ApiEndPointEnumValue> = new Map([
    [
      'ROHINGYA_PROFILE_SEARCH_API',
      new ApiEndPointEnumValue(
        'ROHINGYA_PROFILE_SEARCH',
        '/api/v1/rohingya/search-profile/{id}'
      ),
    ],
    [
      'ROHINGYA_AFIS_GENERATE_JOB',
      new ApiEndPointEnumValue(
        'ROHINGYA_AFIS_SEARCH_JOB',
        '/api/v1/rohingya-afis/search-job'
      ),
    ],
    [
      'BIRTH_REGISTRATION_SEARCH',
      new ApiEndPointEnumValue(
        'BIRTH_REGISTRATION_SEARCH',
        '/api/v1/birth-registration/search'
      ),
    ],
    [
      'NID_SEARCH',
      new ApiEndPointEnumValue('NID_SEARCH', '/api/v1/nid/search'),
    ],
    [
      'PASSPORT_SEARCH',
      new ApiEndPointEnumValue('PASSPORT_SEARCH', '/api/v1/passport/search'),
    ],
    [
      'VEHICLE_REGISTRATION_SEARCH',
      new ApiEndPointEnumValue(
        'VEHICLE_REGISTRATION_SEARCH',
        '/api/v1/vehicle-registration/search'
      ),
    ],
    [
      'STUDENT_SEARCH',
      new ApiEndPointEnumValue('STUDENT_SEARCH', '/api/v1/student/search'),
    ],
    [
      'ESAF_SEARCH',
      new ApiEndPointEnumValue('ESAF_SEARCH', '/api/v1/esaf/search'),
    ],
    [
      'FINANCE_DIVISION_SEARCH',
      new ApiEndPointEnumValue(
        'FINANCE_DIVISION_SEARCH',
        '/api/v1/finance-division/search'
      ),
    ],
    [
      'UNIFIED_PROFILING_SEARCH',
      new ApiEndPointEnumValue(
        'UNIFIED_PROFILING_SEARCH',
        '/api/v1/unified-profiling/search'
      ),
    ],
    [
      'NBR_SEARCH',
      new ApiEndPointEnumValue('NBR_SEARCH', '/api/v1/nbr/search'),
    ],
    [
      'BRTA_DRIVING_LICENSE_SEARCH',
      new ApiEndPointEnumValue(
        'BRTA_DRIVING_LICENSE_SEARCH',
        '/api/v1/driving-license/search'
      ),
    ],
    [
      'NEIR_SEARCH',
      new ApiEndPointEnumValue('NEIR_SEARCH', '/api/v1/neir/search'),
    ],
    [
      'LD_TAX_SEARCH',
      new ApiEndPointEnumValue('LD_TAX_SEARCH', '/api/v1/ld-tax/search'),
    ],
  ]);

  public constructor(accessName: string, apiEndPoint: string) {
    this.accessName = accessName;
    this.apiEndPoint = apiEndPoint;
  }

  public static get(apiEndPointEnum: ApiEndPointEnum): ApiEndPointEnumValue {
    return ApiEndPointEnumValue.enumValueMap.get(apiEndPointEnum)!;
  }
}
