class CCore {
  private _clientKey = "";
  private _clientSecret = "";
  private _currentUserId = "";
  private _systemId = "";
  private _shareUrl = "";
  private _socketUrl = "";
  private _msSocketUrl = "";
  private _sysUrl = "";
  private _secretAuthKey = "";
  private _accessGroup: string | undefined = undefined;
  private _providerName: string | undefined = undefined;
  private _isMasterApp = false;
  private _systemToken = "";
  private _systemName = "";
  private _intercomToken = "";
  private _accessToken = "";
  private _systemPath = "";
  private _runLocal = false;
  private _localDomain = "";
  private _recaptchaV2SiteKey = "";
  private _recaptchaV3SiteKey = "";
  private _urlScheme = "base";
  private _googleWebClientId = "";
  private _googleIOSClientId = "";
  private _microsoftClientId = "";
  private _liveSocketPort: string = "";
  private _msSocketPort: string = "";
  private _masterDeepLink: string = "";

  reset = () => {
    this._clientKey = "";
    this._clientSecret = "";
    this._currentUserId = "";
    this._systemId = "";
    // this._shareUrl = "";
    // this._socketUrl = "";
    // this._sysUrl = "";
    this._systemToken = "";
    this._systemName = "";
    this._intercomToken = "";
    this._accessToken = "";
    this._systemPath = "";
  };

  get clientKey(): string {
    return this._clientKey;
  }

  set clientKey(value: string) {
    this._clientKey = value;
  }

  get clientSecret(): string {
    return this._clientSecret;
  }

  set clientSecret(value: string) {
    this._clientSecret = value;
  }

  get currentUserId(): string {
    return this._currentUserId;
  }

  set currentUserId(value: string) {
    this._currentUserId = value;
  }

  get systemId(): string {
    return this._systemId;
  }

  set systemId(value: string) {
    this._systemId = value;
  }

  get shareUrl(): string {
    return this._shareUrl;
  }

  set shareUrl(value: string) {
    this._shareUrl = value;
  }

  get socketUrl(): string {
    return this._socketUrl;
  }

  set socketUrl(value: string) {
    this._socketUrl = value;
  }

  get sysUrl(): string {
    return this._sysUrl;
  }

  set sysUrl(value: string) {
    this._sysUrl = value;
  }

  get systemToken(): string {
    return this._systemToken;
  }

  set systemToken(value: string) {
    this._systemToken = value;
  }

  get systemName(): string {
    return this._systemName;
  }

  set systemName(value: string) {
    this._systemName = value;
  }

  get intercomToken(): string {
    return this._intercomToken;
  }

  set intercomToken(value: string) {
    this._intercomToken = value;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  get systemPath(): string {
    return this._systemPath;
  }

  set systemPath(value: string) {
    this._systemPath = value;
  }

  get secretAuthKey(): string {
    return this._secretAuthKey;
  }

  set secretAuthKey(value: string) {
    this._secretAuthKey = value;
  }

  get accessGroup(): string | undefined {
    return this._accessGroup;
  }

  set accessGroup(value: string) {
    this._accessGroup = value;
  }

  get providerName(): string | undefined {
    return this._providerName;
  }

  set providerName(value: string) {
    this._providerName = value;
  }

  get isMasterApp(): boolean {
    return this._isMasterApp;
  }

  set isMasterApp(value: boolean) {
    this._isMasterApp = value;
  }

  get runLocal(): boolean {
    return this._runLocal;
  }

  set runLocal(value: boolean) {
    this._runLocal = value;
  }

  get localDomain(): string {
    return this._localDomain;
  }

  set localDomain(value: string) {
    this._localDomain = value;
  }

  get msSocketUrl(): string {
    return this._msSocketUrl;
  }

  set msSocketUrl(value: string) {
    this._msSocketUrl = value;
  }

  get recaptchaV2SiteKey(): string {
    return this._recaptchaV2SiteKey;
  }

  set recaptchaV2SiteKey(value: string) {
    this._recaptchaV2SiteKey = value;
  }

  get recaptchaV3SiteKey(): string {
    return this._recaptchaV3SiteKey;
  }

  set recaptchaV3SiteKey(value: string) {
    this._recaptchaV3SiteKey = value;
  }

  get urlScheme(): string {
    return this._urlScheme;
  }

  set urlScheme(value: string) {
    this._urlScheme = value;
  }

  get googleWebClientId(): string {
    return this._googleWebClientId;
  }

  set googleWebClientId(value: string) {
    this._googleWebClientId = value;
  }

  get googleIOSClientId(): string {
    return this._googleIOSClientId;
  }

  set googleIOSClientId(value: string) {
    this._googleIOSClientId = value;
  }

  get microsoftClientId(): string {
    return this._microsoftClientId;
  }

  set microsoftClientId(value: string) {
    this._microsoftClientId = value;
  }

  get liveSocketPort(): string {
    return this._liveSocketPort ? ":" + this._liveSocketPort : "";
  }

  set liveSocketPort(value: string) {
    this._liveSocketPort = value;
  }

  get msSocketPort(): string {
    return this._msSocketPort ? ":" + this._msSocketPort : "";
  }

  set msSocketPort(value: string) {
    this._msSocketPort = value;
  }

  get masterDeepLink(): string {
    return this._masterDeepLink;
  }

  set masterDeepLink(value: string) {
    this._masterDeepLink = value;
  }

  setup(values: {
    isMasterApp: "true" | "false";
    secretAuthKey: string;
    sysUrl: string;
    shareUrl: string;
    socketUrl: string;
    msSocketUrl: string;
    recaptchaV2SiteKey: string;
    recaptchaV3SiteKey: string;
    urlScheme: string;
    googleWebClientId: string;
    googleIOSClientId: string;
    microsoftClientId: string;
  }) {
    this._isMasterApp = values.isMasterApp === "true";
    this._secretAuthKey = values.secretAuthKey;
    this._sysUrl = values.sysUrl;
    this._shareUrl = values.shareUrl;
    this._socketUrl = values.socketUrl;
    this._msSocketUrl = values.msSocketUrl;
    this._recaptchaV2SiteKey = values.recaptchaV2SiteKey;
    this._recaptchaV3SiteKey = values.recaptchaV3SiteKey;
    this._urlScheme = values.urlScheme;
    this._googleWebClientId = values.googleWebClientId;
    this._googleIOSClientId = values.googleIOSClientId;
    this._microsoftClientId = values.microsoftClientId;
  }
}

export const _Core = new CCore();
