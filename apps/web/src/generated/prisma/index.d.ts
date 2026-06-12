
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Consent
 * 
 */
export type Consent = $Result.DefaultSelection<Prisma.$ConsentPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Connection
 * 
 */
export type Connection = $Result.DefaultSelection<Prisma.$ConnectionPayload>
/**
 * Model ConnectionInvite
 * 
 */
export type ConnectionInvite = $Result.DefaultSelection<Prisma.$ConnectionInvitePayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model Answer
 * 
 */
export type Answer = $Result.DefaultSelection<Prisma.$AnswerPayload>
/**
 * Model Reaction
 * 
 */
export type Reaction = $Result.DefaultSelection<Prisma.$ReactionPayload>
/**
 * Model BookEdition
 * 
 */
export type BookEdition = $Result.DefaultSelection<Prisma.$BookEditionPayload>
/**
 * Model CuratedQuestion
 * 
 */
export type CuratedQuestion = $Result.DefaultSelection<Prisma.$CuratedQuestionPayload>
/**
 * Model AccessLog
 * 
 */
export type AccessLog = $Result.DefaultSelection<Prisma.$AccessLogPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Inquiry
 * 
 */
export type Inquiry = $Result.DefaultSelection<Prisma.$InquiryPayload>
/**
 * Model AdminAudit
 * 
 */
export type AdminAudit = $Result.DefaultSelection<Prisma.$AdminAuditPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  child: 'child',
  parent: 'parent',
  both: 'both'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Tone: {
  light: 'light',
  deep: 'deep'
};

export type Tone = (typeof Tone)[keyof typeof Tone]


export const SensitiveStatus: {
  active: 'active',
  paused_health: 'paused_health',
  deceased: 'deceased',
  memorial: 'memorial'
};

export type SensitiveStatus = (typeof SensitiveStatus)[keyof typeof SensitiveStatus]


export const AnswerFormat: {
  text: 'text',
  photo: 'photo',
  video: 'video',
  audio: 'audio'
};

export type AnswerFormat = (typeof AnswerFormat)[keyof typeof AnswerFormat]


export const BookStatus: {
  draft: 'draft',
  generated: 'generated',
  delivered: 'delivered'
};

export type BookStatus = (typeof BookStatus)[keyof typeof BookStatus]


export const BookEditionType: {
  interim: 'interim',
  final: 'final'
};

export type BookEditionType = (typeof BookEditionType)[keyof typeof BookEditionType]


export const QuestionSource: {
  ai: 'ai',
  curated: 'curated',
  followup: 'followup',
  custom: 'custom',
  parent_message: 'parent_message'
};

export type QuestionSource = (typeof QuestionSource)[keyof typeof QuestionSource]


export const AnswerOrigin: {
  question_response: 'question_response',
  parent_initiated: 'parent_initiated'
};

export type AnswerOrigin = (typeof AnswerOrigin)[keyof typeof AnswerOrigin]


export const InquiryCategory: {
  bug: 'bug',
  feature: 'feature',
  payment: 'payment',
  privacy: 'privacy',
  etc: 'etc'
};

export type InquiryCategory = (typeof InquiryCategory)[keyof typeof InquiryCategory]


export const InquiryStatus: {
  new: 'new',
  in_progress: 'in_progress',
  resolved: 'resolved'
};

export type InquiryStatus = (typeof InquiryStatus)[keyof typeof InquiryStatus]


export const ConsentType: {
  privacy_required: 'privacy_required',
  terms_required: 'terms_required',
  age_over_14: 'age_over_14',
  analytics: 'analytics',
  marketing: 'marketing'
};

export type ConsentType = (typeof ConsentType)[keyof typeof ConsentType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Tone = $Enums.Tone

export const Tone: typeof $Enums.Tone

export type SensitiveStatus = $Enums.SensitiveStatus

export const SensitiveStatus: typeof $Enums.SensitiveStatus

export type AnswerFormat = $Enums.AnswerFormat

export const AnswerFormat: typeof $Enums.AnswerFormat

export type BookStatus = $Enums.BookStatus

export const BookStatus: typeof $Enums.BookStatus

export type BookEditionType = $Enums.BookEditionType

export const BookEditionType: typeof $Enums.BookEditionType

export type QuestionSource = $Enums.QuestionSource

export const QuestionSource: typeof $Enums.QuestionSource

export type AnswerOrigin = $Enums.AnswerOrigin

export const AnswerOrigin: typeof $Enums.AnswerOrigin

export type InquiryCategory = $Enums.InquiryCategory

export const InquiryCategory: typeof $Enums.InquiryCategory

export type InquiryStatus = $Enums.InquiryStatus

export const InquiryStatus: typeof $Enums.InquiryStatus

export type ConsentType = $Enums.ConsentType

export const ConsentType: typeof $Enums.ConsentType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.consent`: Exposes CRUD operations for the **Consent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consents
    * const consents = await prisma.consent.findMany()
    * ```
    */
  get consent(): Prisma.ConsentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.connection`: Exposes CRUD operations for the **Connection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Connections
    * const connections = await prisma.connection.findMany()
    * ```
    */
  get connection(): Prisma.ConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.connectionInvite`: Exposes CRUD operations for the **ConnectionInvite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConnectionInvites
    * const connectionInvites = await prisma.connectionInvite.findMany()
    * ```
    */
  get connectionInvite(): Prisma.ConnectionInviteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.answer`: Exposes CRUD operations for the **Answer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Answers
    * const answers = await prisma.answer.findMany()
    * ```
    */
  get answer(): Prisma.AnswerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reaction`: Exposes CRUD operations for the **Reaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reactions
    * const reactions = await prisma.reaction.findMany()
    * ```
    */
  get reaction(): Prisma.ReactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookEdition`: Exposes CRUD operations for the **BookEdition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookEditions
    * const bookEditions = await prisma.bookEdition.findMany()
    * ```
    */
  get bookEdition(): Prisma.BookEditionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.curatedQuestion`: Exposes CRUD operations for the **CuratedQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CuratedQuestions
    * const curatedQuestions = await prisma.curatedQuestion.findMany()
    * ```
    */
  get curatedQuestion(): Prisma.CuratedQuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.accessLog`: Exposes CRUD operations for the **AccessLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccessLogs
    * const accessLogs = await prisma.accessLog.findMany()
    * ```
    */
  get accessLog(): Prisma.AccessLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inquiry`: Exposes CRUD operations for the **Inquiry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inquiries
    * const inquiries = await prisma.inquiry.findMany()
    * ```
    */
  get inquiry(): Prisma.InquiryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminAudit`: Exposes CRUD operations for the **AdminAudit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminAudits
    * const adminAudits = await prisma.adminAudit.findMany()
    * ```
    */
  get adminAudit(): Prisma.AdminAuditDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Consent: 'Consent',
    Session: 'Session',
    Connection: 'Connection',
    ConnectionInvite: 'ConnectionInvite',
    Question: 'Question',
    Answer: 'Answer',
    Reaction: 'Reaction',
    BookEdition: 'BookEdition',
    CuratedQuestion: 'CuratedQuestion',
    AccessLog: 'AccessLog',
    Admin: 'Admin',
    Inquiry: 'Inquiry',
    AdminAudit: 'AdminAudit'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "consent" | "session" | "connection" | "connectionInvite" | "question" | "answer" | "reaction" | "bookEdition" | "curatedQuestion" | "accessLog" | "admin" | "inquiry" | "adminAudit"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Consent: {
        payload: Prisma.$ConsentPayload<ExtArgs>
        fields: Prisma.ConsentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          findFirst: {
            args: Prisma.ConsentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          findMany: {
            args: Prisma.ConsentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          create: {
            args: Prisma.ConsentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          createMany: {
            args: Prisma.ConsentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          delete: {
            args: Prisma.ConsentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          update: {
            args: Prisma.ConsentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          deleteMany: {
            args: Prisma.ConsentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConsentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          upsert: {
            args: Prisma.ConsentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          aggregate: {
            args: Prisma.ConsentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsent>
          }
          groupBy: {
            args: Prisma.ConsentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsentCountArgs<ExtArgs>
            result: $Utils.Optional<ConsentCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Connection: {
        payload: Prisma.$ConnectionPayload<ExtArgs>
        fields: Prisma.ConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          findFirst: {
            args: Prisma.ConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          findMany: {
            args: Prisma.ConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          create: {
            args: Prisma.ConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          createMany: {
            args: Prisma.ConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          delete: {
            args: Prisma.ConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          update: {
            args: Prisma.ConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          deleteMany: {
            args: Prisma.ConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          upsert: {
            args: Prisma.ConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          aggregate: {
            args: Prisma.ConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConnection>
          }
          groupBy: {
            args: Prisma.ConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<ConnectionCountAggregateOutputType> | number
          }
        }
      }
      ConnectionInvite: {
        payload: Prisma.$ConnectionInvitePayload<ExtArgs>
        fields: Prisma.ConnectionInviteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConnectionInviteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConnectionInviteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload>
          }
          findFirst: {
            args: Prisma.ConnectionInviteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConnectionInviteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload>
          }
          findMany: {
            args: Prisma.ConnectionInviteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload>[]
          }
          create: {
            args: Prisma.ConnectionInviteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload>
          }
          createMany: {
            args: Prisma.ConnectionInviteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConnectionInviteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload>[]
          }
          delete: {
            args: Prisma.ConnectionInviteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload>
          }
          update: {
            args: Prisma.ConnectionInviteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload>
          }
          deleteMany: {
            args: Prisma.ConnectionInviteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConnectionInviteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConnectionInviteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload>[]
          }
          upsert: {
            args: Prisma.ConnectionInviteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionInvitePayload>
          }
          aggregate: {
            args: Prisma.ConnectionInviteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConnectionInvite>
          }
          groupBy: {
            args: Prisma.ConnectionInviteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConnectionInviteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConnectionInviteCountArgs<ExtArgs>
            result: $Utils.Optional<ConnectionInviteCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      Answer: {
        payload: Prisma.$AnswerPayload<ExtArgs>
        fields: Prisma.AnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          findFirst: {
            args: Prisma.AnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          findMany: {
            args: Prisma.AnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          create: {
            args: Prisma.AnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          createMany: {
            args: Prisma.AnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          delete: {
            args: Prisma.AnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          update: {
            args: Prisma.AnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          deleteMany: {
            args: Prisma.AnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnswerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          upsert: {
            args: Prisma.AnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          aggregate: {
            args: Prisma.AnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnswer>
          }
          groupBy: {
            args: Prisma.AnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnswerCountArgs<ExtArgs>
            result: $Utils.Optional<AnswerCountAggregateOutputType> | number
          }
        }
      }
      Reaction: {
        payload: Prisma.$ReactionPayload<ExtArgs>
        fields: Prisma.ReactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          findFirst: {
            args: Prisma.ReactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          findMany: {
            args: Prisma.ReactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>[]
          }
          create: {
            args: Prisma.ReactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          createMany: {
            args: Prisma.ReactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>[]
          }
          delete: {
            args: Prisma.ReactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          update: {
            args: Prisma.ReactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          deleteMany: {
            args: Prisma.ReactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>[]
          }
          upsert: {
            args: Prisma.ReactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          aggregate: {
            args: Prisma.ReactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReaction>
          }
          groupBy: {
            args: Prisma.ReactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReactionCountArgs<ExtArgs>
            result: $Utils.Optional<ReactionCountAggregateOutputType> | number
          }
        }
      }
      BookEdition: {
        payload: Prisma.$BookEditionPayload<ExtArgs>
        fields: Prisma.BookEditionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookEditionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookEditionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload>
          }
          findFirst: {
            args: Prisma.BookEditionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookEditionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload>
          }
          findMany: {
            args: Prisma.BookEditionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload>[]
          }
          create: {
            args: Prisma.BookEditionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload>
          }
          createMany: {
            args: Prisma.BookEditionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookEditionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload>[]
          }
          delete: {
            args: Prisma.BookEditionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload>
          }
          update: {
            args: Prisma.BookEditionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload>
          }
          deleteMany: {
            args: Prisma.BookEditionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookEditionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookEditionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload>[]
          }
          upsert: {
            args: Prisma.BookEditionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookEditionPayload>
          }
          aggregate: {
            args: Prisma.BookEditionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookEdition>
          }
          groupBy: {
            args: Prisma.BookEditionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookEditionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookEditionCountArgs<ExtArgs>
            result: $Utils.Optional<BookEditionCountAggregateOutputType> | number
          }
        }
      }
      CuratedQuestion: {
        payload: Prisma.$CuratedQuestionPayload<ExtArgs>
        fields: Prisma.CuratedQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CuratedQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CuratedQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload>
          }
          findFirst: {
            args: Prisma.CuratedQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CuratedQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload>
          }
          findMany: {
            args: Prisma.CuratedQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload>[]
          }
          create: {
            args: Prisma.CuratedQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload>
          }
          createMany: {
            args: Prisma.CuratedQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CuratedQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload>[]
          }
          delete: {
            args: Prisma.CuratedQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload>
          }
          update: {
            args: Prisma.CuratedQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload>
          }
          deleteMany: {
            args: Prisma.CuratedQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CuratedQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CuratedQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload>[]
          }
          upsert: {
            args: Prisma.CuratedQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuratedQuestionPayload>
          }
          aggregate: {
            args: Prisma.CuratedQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCuratedQuestion>
          }
          groupBy: {
            args: Prisma.CuratedQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CuratedQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CuratedQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<CuratedQuestionCountAggregateOutputType> | number
          }
        }
      }
      AccessLog: {
        payload: Prisma.$AccessLogPayload<ExtArgs>
        fields: Prisma.AccessLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccessLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccessLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          findFirst: {
            args: Prisma.AccessLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccessLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          findMany: {
            args: Prisma.AccessLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>[]
          }
          create: {
            args: Prisma.AccessLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          createMany: {
            args: Prisma.AccessLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccessLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>[]
          }
          delete: {
            args: Prisma.AccessLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          update: {
            args: Prisma.AccessLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          deleteMany: {
            args: Prisma.AccessLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccessLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccessLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>[]
          }
          upsert: {
            args: Prisma.AccessLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccessLogPayload>
          }
          aggregate: {
            args: Prisma.AccessLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccessLog>
          }
          groupBy: {
            args: Prisma.AccessLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccessLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccessLogCountArgs<ExtArgs>
            result: $Utils.Optional<AccessLogCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Inquiry: {
        payload: Prisma.$InquiryPayload<ExtArgs>
        fields: Prisma.InquiryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InquiryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InquiryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          findFirst: {
            args: Prisma.InquiryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InquiryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          findMany: {
            args: Prisma.InquiryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>[]
          }
          create: {
            args: Prisma.InquiryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          createMany: {
            args: Prisma.InquiryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InquiryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>[]
          }
          delete: {
            args: Prisma.InquiryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          update: {
            args: Prisma.InquiryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          deleteMany: {
            args: Prisma.InquiryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InquiryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InquiryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>[]
          }
          upsert: {
            args: Prisma.InquiryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          aggregate: {
            args: Prisma.InquiryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInquiry>
          }
          groupBy: {
            args: Prisma.InquiryGroupByArgs<ExtArgs>
            result: $Utils.Optional<InquiryGroupByOutputType>[]
          }
          count: {
            args: Prisma.InquiryCountArgs<ExtArgs>
            result: $Utils.Optional<InquiryCountAggregateOutputType> | number
          }
        }
      }
      AdminAudit: {
        payload: Prisma.$AdminAuditPayload<ExtArgs>
        fields: Prisma.AdminAuditFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminAuditFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminAuditFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload>
          }
          findFirst: {
            args: Prisma.AdminAuditFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminAuditFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload>
          }
          findMany: {
            args: Prisma.AdminAuditFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload>[]
          }
          create: {
            args: Prisma.AdminAuditCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload>
          }
          createMany: {
            args: Prisma.AdminAuditCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminAuditCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload>[]
          }
          delete: {
            args: Prisma.AdminAuditDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload>
          }
          update: {
            args: Prisma.AdminAuditUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload>
          }
          deleteMany: {
            args: Prisma.AdminAuditDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminAuditUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminAuditUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload>[]
          }
          upsert: {
            args: Prisma.AdminAuditUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminAuditPayload>
          }
          aggregate: {
            args: Prisma.AdminAuditAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminAudit>
          }
          groupBy: {
            args: Prisma.AdminAuditGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminAuditGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminAuditCountArgs<ExtArgs>
            result: $Utils.Optional<AdminAuditCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    consent?: ConsentOmit
    session?: SessionOmit
    connection?: ConnectionOmit
    connectionInvite?: ConnectionInviteOmit
    question?: QuestionOmit
    answer?: AnswerOmit
    reaction?: ReactionOmit
    bookEdition?: BookEditionOmit
    curatedQuestion?: CuratedQuestionOmit
    accessLog?: AccessLogOmit
    admin?: AdminOmit
    inquiry?: InquiryOmit
    adminAudit?: AdminAuditOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sentConnections: number
    receivedConnections: number
    childInvites: number
    acceptedInvites: number
    sessions: number
    reactions: number
    accessLogs: number
    consents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentConnections?: boolean | UserCountOutputTypeCountSentConnectionsArgs
    receivedConnections?: boolean | UserCountOutputTypeCountReceivedConnectionsArgs
    childInvites?: boolean | UserCountOutputTypeCountChildInvitesArgs
    acceptedInvites?: boolean | UserCountOutputTypeCountAcceptedInvitesArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    reactions?: boolean | UserCountOutputTypeCountReactionsArgs
    accessLogs?: boolean | UserCountOutputTypeCountAccessLogsArgs
    consents?: boolean | UserCountOutputTypeCountConsentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChildInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionInviteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAcceptedInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionInviteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConsentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
  }


  /**
   * Count Type ConnectionCountOutputType
   */

  export type ConnectionCountOutputType = {
    questions: number
    bookEditions: number
  }

  export type ConnectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | ConnectionCountOutputTypeCountQuestionsArgs
    bookEditions?: boolean | ConnectionCountOutputTypeCountBookEditionsArgs
  }

  // Custom InputTypes
  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionCountOutputType
     */
    select?: ConnectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * ConnectionCountOutputType without action
   */
  export type ConnectionCountOutputTypeCountBookEditionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookEditionWhereInput
  }


  /**
   * Count Type AnswerCountOutputType
   */

  export type AnswerCountOutputType = {
    reactions: number
  }

  export type AnswerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reactions?: boolean | AnswerCountOutputTypeCountReactionsArgs
  }

  // Custom InputTypes
  /**
   * AnswerCountOutputType without action
   */
  export type AnswerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerCountOutputType
     */
    select?: AnswerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnswerCountOutputType without action
   */
  export type AnswerCountOutputTypeCountReactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    name: string | null
    role: $Enums.Role | null
    avatarUrl: string | null
    passwordHash: string | null
    consentAnalytics: boolean | null
    consentMarketing: boolean | null
    consentAt: Date | null
    lastSeenAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    name: string | null
    role: $Enums.Role | null
    avatarUrl: string | null
    passwordHash: string | null
    consentAnalytics: boolean | null
    consentMarketing: boolean | null
    consentAt: Date | null
    lastSeenAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    phone: number
    name: number
    role: number
    avatarUrl: number
    passwordHash: number
    consentAnalytics: number
    consentMarketing: number
    consentAt: number
    lastSeenAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    name?: true
    role?: true
    avatarUrl?: true
    passwordHash?: true
    consentAnalytics?: true
    consentMarketing?: true
    consentAt?: true
    lastSeenAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    name?: true
    role?: true
    avatarUrl?: true
    passwordHash?: true
    consentAnalytics?: true
    consentMarketing?: true
    consentAt?: true
    lastSeenAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    name?: true
    role?: true
    avatarUrl?: true
    passwordHash?: true
    consentAnalytics?: true
    consentMarketing?: true
    consentAt?: true
    lastSeenAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    phone: string | null
    name: string
    role: $Enums.Role
    avatarUrl: string | null
    passwordHash: string | null
    consentAnalytics: boolean
    consentMarketing: boolean
    consentAt: Date | null
    lastSeenAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    passwordHash?: boolean
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: boolean
    lastSeenAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentConnections?: boolean | User$sentConnectionsArgs<ExtArgs>
    receivedConnections?: boolean | User$receivedConnectionsArgs<ExtArgs>
    childInvites?: boolean | User$childInvitesArgs<ExtArgs>
    acceptedInvites?: boolean | User$acceptedInvitesArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    reactions?: boolean | User$reactionsArgs<ExtArgs>
    accessLogs?: boolean | User$accessLogsArgs<ExtArgs>
    admin?: boolean | User$adminArgs<ExtArgs>
    consents?: boolean | User$consentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    passwordHash?: boolean
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: boolean
    lastSeenAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    passwordHash?: boolean
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: boolean
    lastSeenAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    phone?: boolean
    name?: boolean
    role?: boolean
    avatarUrl?: boolean
    passwordHash?: boolean
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: boolean
    lastSeenAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "phone" | "name" | "role" | "avatarUrl" | "passwordHash" | "consentAnalytics" | "consentMarketing" | "consentAt" | "lastSeenAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentConnections?: boolean | User$sentConnectionsArgs<ExtArgs>
    receivedConnections?: boolean | User$receivedConnectionsArgs<ExtArgs>
    childInvites?: boolean | User$childInvitesArgs<ExtArgs>
    acceptedInvites?: boolean | User$acceptedInvitesArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    reactions?: boolean | User$reactionsArgs<ExtArgs>
    accessLogs?: boolean | User$accessLogsArgs<ExtArgs>
    admin?: boolean | User$adminArgs<ExtArgs>
    consents?: boolean | User$consentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sentConnections: Prisma.$ConnectionPayload<ExtArgs>[]
      receivedConnections: Prisma.$ConnectionPayload<ExtArgs>[]
      childInvites: Prisma.$ConnectionInvitePayload<ExtArgs>[]
      acceptedInvites: Prisma.$ConnectionInvitePayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      reactions: Prisma.$ReactionPayload<ExtArgs>[]
      accessLogs: Prisma.$AccessLogPayload<ExtArgs>[]
      admin: Prisma.$AdminPayload<ExtArgs> | null
      consents: Prisma.$ConsentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      phone: string | null
      name: string
      role: $Enums.Role
      avatarUrl: string | null
      passwordHash: string | null
      consentAnalytics: boolean
      consentMarketing: boolean
      consentAt: Date | null
      lastSeenAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sentConnections<T extends User$sentConnectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentConnectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedConnections<T extends User$receivedConnectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedConnectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    childInvites<T extends User$childInvitesArgs<ExtArgs> = {}>(args?: Subset<T, User$childInvitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    acceptedInvites<T extends User$acceptedInvitesArgs<ExtArgs> = {}>(args?: Subset<T, User$acceptedInvitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reactions<T extends User$reactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accessLogs<T extends User$accessLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$accessLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    admin<T extends User$adminArgs<ExtArgs> = {}>(args?: Subset<T, User$adminArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    consents<T extends User$consentsArgs<ExtArgs> = {}>(args?: Subset<T, User$consentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly consentAnalytics: FieldRef<"User", 'Boolean'>
    readonly consentMarketing: FieldRef<"User", 'Boolean'>
    readonly consentAt: FieldRef<"User", 'DateTime'>
    readonly lastSeenAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sentConnections
   */
  export type User$sentConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    where?: ConnectionWhereInput
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    cursor?: ConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * User.receivedConnections
   */
  export type User$receivedConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    where?: ConnectionWhereInput
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    cursor?: ConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * User.childInvites
   */
  export type User$childInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    where?: ConnectionInviteWhereInput
    orderBy?: ConnectionInviteOrderByWithRelationInput | ConnectionInviteOrderByWithRelationInput[]
    cursor?: ConnectionInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConnectionInviteScalarFieldEnum | ConnectionInviteScalarFieldEnum[]
  }

  /**
   * User.acceptedInvites
   */
  export type User$acceptedInvitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    where?: ConnectionInviteWhereInput
    orderBy?: ConnectionInviteOrderByWithRelationInput | ConnectionInviteOrderByWithRelationInput[]
    cursor?: ConnectionInviteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConnectionInviteScalarFieldEnum | ConnectionInviteScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.reactions
   */
  export type User$reactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    where?: ReactionWhereInput
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    cursor?: ReactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * User.accessLogs
   */
  export type User$accessLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    where?: AccessLogWhereInput
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    cursor?: AccessLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccessLogScalarFieldEnum | AccessLogScalarFieldEnum[]
  }

  /**
   * User.admin
   */
  export type User$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    where?: AdminWhereInput
  }

  /**
   * User.consents
   */
  export type User$consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    cursor?: ConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Consent
   */

  export type AggregateConsent = {
    _count: ConsentCountAggregateOutputType | null
    _min: ConsentMinAggregateOutputType | null
    _max: ConsentMaxAggregateOutputType | null
  }

  export type ConsentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.ConsentType | null
    agreed: boolean | null
    version: string | null
    createdAt: Date | null
  }

  export type ConsentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.ConsentType | null
    agreed: boolean | null
    version: string | null
    createdAt: Date | null
  }

  export type ConsentCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    agreed: number
    version: number
    createdAt: number
    _all: number
  }


  export type ConsentMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    agreed?: true
    version?: true
    createdAt?: true
  }

  export type ConsentMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    agreed?: true
    version?: true
    createdAt?: true
  }

  export type ConsentCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    agreed?: true
    version?: true
    createdAt?: true
    _all?: true
  }

  export type ConsentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consent to aggregate.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consents
    **/
    _count?: true | ConsentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsentMaxAggregateInputType
  }

  export type GetConsentAggregateType<T extends ConsentAggregateArgs> = {
        [P in keyof T & keyof AggregateConsent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsent[P]>
      : GetScalarType<T[P], AggregateConsent[P]>
  }




  export type ConsentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithAggregationInput | ConsentOrderByWithAggregationInput[]
    by: ConsentScalarFieldEnum[] | ConsentScalarFieldEnum
    having?: ConsentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsentCountAggregateInputType | true
    _min?: ConsentMinAggregateInputType
    _max?: ConsentMaxAggregateInputType
  }

  export type ConsentGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.ConsentType
    agreed: boolean
    version: string
    createdAt: Date
    _count: ConsentCountAggregateOutputType | null
    _min: ConsentMinAggregateOutputType | null
    _max: ConsentMaxAggregateOutputType | null
  }

  type GetConsentGroupByPayload<T extends ConsentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsentGroupByOutputType[P]>
            : GetScalarType<T[P], ConsentGroupByOutputType[P]>
        }
      >
    >


  export type ConsentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    agreed?: boolean
    version?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    agreed?: boolean
    version?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    agreed?: boolean
    version?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    agreed?: boolean
    version?: boolean
    createdAt?: boolean
  }

  export type ConsentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "agreed" | "version" | "createdAt", ExtArgs["result"]["consent"]>
  export type ConsentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConsentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConsentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConsentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.ConsentType
      agreed: boolean
      version: string
      createdAt: Date
    }, ExtArgs["result"]["consent"]>
    composites: {}
  }

  type ConsentGetPayload<S extends boolean | null | undefined | ConsentDefaultArgs> = $Result.GetResult<Prisma.$ConsentPayload, S>

  type ConsentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConsentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConsentCountAggregateInputType | true
    }

  export interface ConsentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consent'], meta: { name: 'Consent' } }
    /**
     * Find zero or one Consent that matches the filter.
     * @param {ConsentFindUniqueArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsentFindUniqueArgs>(args: SelectSubset<T, ConsentFindUniqueArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Consent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConsentFindUniqueOrThrowArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsentFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindFirstArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsentFindFirstArgs>(args?: SelectSubset<T, ConsentFindFirstArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Consent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindFirstOrThrowArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsentFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Consents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consents
     * const consents = await prisma.consent.findMany()
     * 
     * // Get first 10 Consents
     * const consents = await prisma.consent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consentWithIdOnly = await prisma.consent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsentFindManyArgs>(args?: SelectSubset<T, ConsentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Consent.
     * @param {ConsentCreateArgs} args - Arguments to create a Consent.
     * @example
     * // Create one Consent
     * const Consent = await prisma.consent.create({
     *   data: {
     *     // ... data to create a Consent
     *   }
     * })
     * 
     */
    create<T extends ConsentCreateArgs>(args: SelectSubset<T, ConsentCreateArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Consents.
     * @param {ConsentCreateManyArgs} args - Arguments to create many Consents.
     * @example
     * // Create many Consents
     * const consent = await prisma.consent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsentCreateManyArgs>(args?: SelectSubset<T, ConsentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consents and returns the data saved in the database.
     * @param {ConsentCreateManyAndReturnArgs} args - Arguments to create many Consents.
     * @example
     * // Create many Consents
     * const consent = await prisma.consent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consents and only return the `id`
     * const consentWithIdOnly = await prisma.consent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsentCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Consent.
     * @param {ConsentDeleteArgs} args - Arguments to delete one Consent.
     * @example
     * // Delete one Consent
     * const Consent = await prisma.consent.delete({
     *   where: {
     *     // ... filter to delete one Consent
     *   }
     * })
     * 
     */
    delete<T extends ConsentDeleteArgs>(args: SelectSubset<T, ConsentDeleteArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Consent.
     * @param {ConsentUpdateArgs} args - Arguments to update one Consent.
     * @example
     * // Update one Consent
     * const consent = await prisma.consent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsentUpdateArgs>(args: SelectSubset<T, ConsentUpdateArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Consents.
     * @param {ConsentDeleteManyArgs} args - Arguments to filter Consents to delete.
     * @example
     * // Delete a few Consents
     * const { count } = await prisma.consent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsentDeleteManyArgs>(args?: SelectSubset<T, ConsentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consents
     * const consent = await prisma.consent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsentUpdateManyArgs>(args: SelectSubset<T, ConsentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consents and returns the data updated in the database.
     * @param {ConsentUpdateManyAndReturnArgs} args - Arguments to update many Consents.
     * @example
     * // Update many Consents
     * const consent = await prisma.consent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Consents and only return the `id`
     * const consentWithIdOnly = await prisma.consent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConsentUpdateManyAndReturnArgs>(args: SelectSubset<T, ConsentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Consent.
     * @param {ConsentUpsertArgs} args - Arguments to update or create a Consent.
     * @example
     * // Update or create a Consent
     * const consent = await prisma.consent.upsert({
     *   create: {
     *     // ... data to create a Consent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consent we want to update
     *   }
     * })
     */
    upsert<T extends ConsentUpsertArgs>(args: SelectSubset<T, ConsentUpsertArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Consents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCountArgs} args - Arguments to filter Consents to count.
     * @example
     * // Count the number of Consents
     * const count = await prisma.consent.count({
     *   where: {
     *     // ... the filter for the Consents we want to count
     *   }
     * })
    **/
    count<T extends ConsentCountArgs>(
      args?: Subset<T, ConsentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConsentAggregateArgs>(args: Subset<T, ConsentAggregateArgs>): Prisma.PrismaPromise<GetConsentAggregateType<T>>

    /**
     * Group by Consent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConsentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsentGroupByArgs['orderBy'] }
        : { orderBy?: ConsentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConsentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consent model
   */
  readonly fields: ConsentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Consent model
   */
  interface ConsentFieldRefs {
    readonly id: FieldRef<"Consent", 'String'>
    readonly userId: FieldRef<"Consent", 'String'>
    readonly type: FieldRef<"Consent", 'ConsentType'>
    readonly agreed: FieldRef<"Consent", 'Boolean'>
    readonly version: FieldRef<"Consent", 'String'>
    readonly createdAt: FieldRef<"Consent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Consent findUnique
   */
  export type ConsentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent findUniqueOrThrow
   */
  export type ConsentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent findFirst
   */
  export type ConsentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consents.
     */
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent findFirstOrThrow
   */
  export type ConsentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consents.
     */
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent findMany
   */
  export type ConsentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consents to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent create
   */
  export type ConsentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The data needed to create a Consent.
     */
    data: XOR<ConsentCreateInput, ConsentUncheckedCreateInput>
  }

  /**
   * Consent createMany
   */
  export type ConsentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consents.
     */
    data: ConsentCreateManyInput | ConsentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Consent createManyAndReturn
   */
  export type ConsentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * The data used to create many Consents.
     */
    data: ConsentCreateManyInput | ConsentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consent update
   */
  export type ConsentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The data needed to update a Consent.
     */
    data: XOR<ConsentUpdateInput, ConsentUncheckedUpdateInput>
    /**
     * Choose, which Consent to update.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent updateMany
   */
  export type ConsentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consents.
     */
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyInput>
    /**
     * Filter which Consents to update
     */
    where?: ConsentWhereInput
    /**
     * Limit how many Consents to update.
     */
    limit?: number
  }

  /**
   * Consent updateManyAndReturn
   */
  export type ConsentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * The data used to update Consents.
     */
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyInput>
    /**
     * Filter which Consents to update
     */
    where?: ConsentWhereInput
    /**
     * Limit how many Consents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consent upsert
   */
  export type ConsentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The filter to search for the Consent to update in case it exists.
     */
    where: ConsentWhereUniqueInput
    /**
     * In case the Consent found by the `where` argument doesn't exist, create a new Consent with this data.
     */
    create: XOR<ConsentCreateInput, ConsentUncheckedCreateInput>
    /**
     * In case the Consent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsentUpdateInput, ConsentUncheckedUpdateInput>
  }

  /**
   * Consent delete
   */
  export type ConsentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter which Consent to delete.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent deleteMany
   */
  export type ConsentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consents to delete
     */
    where?: ConsentWhereInput
    /**
     * Limit how many Consents to delete.
     */
    limit?: number
  }

  /**
   * Consent without action
   */
  export type ConsentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Consent
     */
    omit?: ConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "createdAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Connection
   */

  export type AggregateConnection = {
    _count: ConnectionCountAggregateOutputType | null
    _avg: ConnectionAvgAggregateOutputType | null
    _sum: ConnectionSumAggregateOutputType | null
    _min: ConnectionMinAggregateOutputType | null
    _max: ConnectionMaxAggregateOutputType | null
  }

  export type ConnectionAvgAggregateOutputType = {
    intimacy: number | null
    currentDepth: number | null
    skipCount: number | null
    answerCount: number | null
  }

  export type ConnectionSumAggregateOutputType = {
    intimacy: number | null
    currentDepth: number | null
    skipCount: number | null
    answerCount: number | null
  }

  export type ConnectionMinAggregateOutputType = {
    id: string | null
    fromUserId: string | null
    toUserId: string | null
    intimacy: number | null
    cohabiting: boolean | null
    hasConflict: boolean | null
    responseChannel: string | null
    tone: $Enums.Tone | null
    sensitiveStatus: $Enums.SensitiveStatus | null
    currentDepth: number | null
    skipCount: number | null
    answerCount: number | null
    inviteCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConnectionMaxAggregateOutputType = {
    id: string | null
    fromUserId: string | null
    toUserId: string | null
    intimacy: number | null
    cohabiting: boolean | null
    hasConflict: boolean | null
    responseChannel: string | null
    tone: $Enums.Tone | null
    sensitiveStatus: $Enums.SensitiveStatus | null
    currentDepth: number | null
    skipCount: number | null
    answerCount: number | null
    inviteCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConnectionCountAggregateOutputType = {
    id: number
    fromUserId: number
    toUserId: number
    intimacy: number
    cohabiting: number
    hasConflict: number
    responseChannel: number
    tone: number
    sensitiveStatus: number
    currentDepth: number
    skipCount: number
    answerCount: number
    inviteCode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConnectionAvgAggregateInputType = {
    intimacy?: true
    currentDepth?: true
    skipCount?: true
    answerCount?: true
  }

  export type ConnectionSumAggregateInputType = {
    intimacy?: true
    currentDepth?: true
    skipCount?: true
    answerCount?: true
  }

  export type ConnectionMinAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    intimacy?: true
    cohabiting?: true
    hasConflict?: true
    responseChannel?: true
    tone?: true
    sensitiveStatus?: true
    currentDepth?: true
    skipCount?: true
    answerCount?: true
    inviteCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConnectionMaxAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    intimacy?: true
    cohabiting?: true
    hasConflict?: true
    responseChannel?: true
    tone?: true
    sensitiveStatus?: true
    currentDepth?: true
    skipCount?: true
    answerCount?: true
    inviteCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConnectionCountAggregateInputType = {
    id?: true
    fromUserId?: true
    toUserId?: true
    intimacy?: true
    cohabiting?: true
    hasConflict?: true
    responseChannel?: true
    tone?: true
    sensitiveStatus?: true
    currentDepth?: true
    skipCount?: true
    answerCount?: true
    inviteCode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connection to aggregate.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Connections
    **/
    _count?: true | ConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConnectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConnectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConnectionMaxAggregateInputType
  }

  export type GetConnectionAggregateType<T extends ConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConnection[P]>
      : GetScalarType<T[P], AggregateConnection[P]>
  }




  export type ConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionWhereInput
    orderBy?: ConnectionOrderByWithAggregationInput | ConnectionOrderByWithAggregationInput[]
    by: ConnectionScalarFieldEnum[] | ConnectionScalarFieldEnum
    having?: ConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConnectionCountAggregateInputType | true
    _avg?: ConnectionAvgAggregateInputType
    _sum?: ConnectionSumAggregateInputType
    _min?: ConnectionMinAggregateInputType
    _max?: ConnectionMaxAggregateInputType
  }

  export type ConnectionGroupByOutputType = {
    id: string
    fromUserId: string
    toUserId: string
    intimacy: number
    cohabiting: boolean
    hasConflict: boolean
    responseChannel: string
    tone: $Enums.Tone
    sensitiveStatus: $Enums.SensitiveStatus
    currentDepth: number
    skipCount: number
    answerCount: number
    inviteCode: string | null
    createdAt: Date
    updatedAt: Date
    _count: ConnectionCountAggregateOutputType | null
    _avg: ConnectionAvgAggregateOutputType | null
    _sum: ConnectionSumAggregateOutputType | null
    _min: ConnectionMinAggregateOutputType | null
    _max: ConnectionMaxAggregateOutputType | null
  }

  type GetConnectionGroupByPayload<T extends ConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], ConnectionGroupByOutputType[P]>
        }
      >
    >


  export type ConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    intimacy?: boolean
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: boolean
    tone?: boolean
    sensitiveStatus?: boolean
    currentDepth?: boolean
    skipCount?: boolean
    answerCount?: boolean
    inviteCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | Connection$questionsArgs<ExtArgs>
    bookEditions?: boolean | Connection$bookEditionsArgs<ExtArgs>
    invite?: boolean | Connection$inviteArgs<ExtArgs>
    _count?: boolean | ConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    intimacy?: boolean
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: boolean
    tone?: boolean
    sensitiveStatus?: boolean
    currentDepth?: boolean
    skipCount?: boolean
    answerCount?: boolean
    inviteCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    intimacy?: boolean
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: boolean
    tone?: boolean
    sensitiveStatus?: boolean
    currentDepth?: boolean
    skipCount?: boolean
    answerCount?: boolean
    inviteCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectScalar = {
    id?: boolean
    fromUserId?: boolean
    toUserId?: boolean
    intimacy?: boolean
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: boolean
    tone?: boolean
    sensitiveStatus?: boolean
    currentDepth?: boolean
    skipCount?: boolean
    answerCount?: boolean
    inviteCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fromUserId" | "toUserId" | "intimacy" | "cohabiting" | "hasConflict" | "responseChannel" | "tone" | "sensitiveStatus" | "currentDepth" | "skipCount" | "answerCount" | "inviteCode" | "createdAt" | "updatedAt", ExtArgs["result"]["connection"]>
  export type ConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | Connection$questionsArgs<ExtArgs>
    bookEditions?: boolean | Connection$bookEditionsArgs<ExtArgs>
    invite?: boolean | Connection$inviteArgs<ExtArgs>
    _count?: boolean | ConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConnectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fromUser?: boolean | UserDefaultArgs<ExtArgs>
    toUser?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Connection"
    objects: {
      fromUser: Prisma.$UserPayload<ExtArgs>
      toUser: Prisma.$UserPayload<ExtArgs>
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      bookEditions: Prisma.$BookEditionPayload<ExtArgs>[]
      invite: Prisma.$ConnectionInvitePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fromUserId: string
      toUserId: string
      intimacy: number
      cohabiting: boolean
      hasConflict: boolean
      responseChannel: string
      tone: $Enums.Tone
      sensitiveStatus: $Enums.SensitiveStatus
      currentDepth: number
      skipCount: number
      answerCount: number
      inviteCode: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["connection"]>
    composites: {}
  }

  type ConnectionGetPayload<S extends boolean | null | undefined | ConnectionDefaultArgs> = $Result.GetResult<Prisma.$ConnectionPayload, S>

  type ConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConnectionCountAggregateInputType | true
    }

  export interface ConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Connection'], meta: { name: 'Connection' } }
    /**
     * Find zero or one Connection that matches the filter.
     * @param {ConnectionFindUniqueArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConnectionFindUniqueArgs>(args: SelectSubset<T, ConnectionFindUniqueArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Connection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConnectionFindUniqueOrThrowArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Connection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindFirstArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConnectionFindFirstArgs>(args?: SelectSubset<T, ConnectionFindFirstArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Connection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindFirstOrThrowArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Connections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Connections
     * const connections = await prisma.connection.findMany()
     * 
     * // Get first 10 Connections
     * const connections = await prisma.connection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const connectionWithIdOnly = await prisma.connection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConnectionFindManyArgs>(args?: SelectSubset<T, ConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Connection.
     * @param {ConnectionCreateArgs} args - Arguments to create a Connection.
     * @example
     * // Create one Connection
     * const Connection = await prisma.connection.create({
     *   data: {
     *     // ... data to create a Connection
     *   }
     * })
     * 
     */
    create<T extends ConnectionCreateArgs>(args: SelectSubset<T, ConnectionCreateArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Connections.
     * @param {ConnectionCreateManyArgs} args - Arguments to create many Connections.
     * @example
     * // Create many Connections
     * const connection = await prisma.connection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConnectionCreateManyArgs>(args?: SelectSubset<T, ConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Connections and returns the data saved in the database.
     * @param {ConnectionCreateManyAndReturnArgs} args - Arguments to create many Connections.
     * @example
     * // Create many Connections
     * const connection = await prisma.connection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Connections and only return the `id`
     * const connectionWithIdOnly = await prisma.connection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Connection.
     * @param {ConnectionDeleteArgs} args - Arguments to delete one Connection.
     * @example
     * // Delete one Connection
     * const Connection = await prisma.connection.delete({
     *   where: {
     *     // ... filter to delete one Connection
     *   }
     * })
     * 
     */
    delete<T extends ConnectionDeleteArgs>(args: SelectSubset<T, ConnectionDeleteArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Connection.
     * @param {ConnectionUpdateArgs} args - Arguments to update one Connection.
     * @example
     * // Update one Connection
     * const connection = await prisma.connection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConnectionUpdateArgs>(args: SelectSubset<T, ConnectionUpdateArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Connections.
     * @param {ConnectionDeleteManyArgs} args - Arguments to filter Connections to delete.
     * @example
     * // Delete a few Connections
     * const { count } = await prisma.connection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConnectionDeleteManyArgs>(args?: SelectSubset<T, ConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Connections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Connections
     * const connection = await prisma.connection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConnectionUpdateManyArgs>(args: SelectSubset<T, ConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Connections and returns the data updated in the database.
     * @param {ConnectionUpdateManyAndReturnArgs} args - Arguments to update many Connections.
     * @example
     * // Update many Connections
     * const connection = await prisma.connection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Connections and only return the `id`
     * const connectionWithIdOnly = await prisma.connection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Connection.
     * @param {ConnectionUpsertArgs} args - Arguments to update or create a Connection.
     * @example
     * // Update or create a Connection
     * const connection = await prisma.connection.upsert({
     *   create: {
     *     // ... data to create a Connection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Connection we want to update
     *   }
     * })
     */
    upsert<T extends ConnectionUpsertArgs>(args: SelectSubset<T, ConnectionUpsertArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Connections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionCountArgs} args - Arguments to filter Connections to count.
     * @example
     * // Count the number of Connections
     * const count = await prisma.connection.count({
     *   where: {
     *     // ... the filter for the Connections we want to count
     *   }
     * })
    **/
    count<T extends ConnectionCountArgs>(
      args?: Subset<T, ConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Connection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConnectionAggregateArgs>(args: Subset<T, ConnectionAggregateArgs>): Prisma.PrismaPromise<GetConnectionAggregateType<T>>

    /**
     * Group by Connection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConnectionGroupByArgs['orderBy'] }
        : { orderBy?: ConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Connection model
   */
  readonly fields: ConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Connection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    fromUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questions<T extends Connection$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Connection$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookEditions<T extends Connection$bookEditionsArgs<ExtArgs> = {}>(args?: Subset<T, Connection$bookEditionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invite<T extends Connection$inviteArgs<ExtArgs> = {}>(args?: Subset<T, Connection$inviteArgs<ExtArgs>>): Prisma__ConnectionInviteClient<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Connection model
   */
  interface ConnectionFieldRefs {
    readonly id: FieldRef<"Connection", 'String'>
    readonly fromUserId: FieldRef<"Connection", 'String'>
    readonly toUserId: FieldRef<"Connection", 'String'>
    readonly intimacy: FieldRef<"Connection", 'Int'>
    readonly cohabiting: FieldRef<"Connection", 'Boolean'>
    readonly hasConflict: FieldRef<"Connection", 'Boolean'>
    readonly responseChannel: FieldRef<"Connection", 'String'>
    readonly tone: FieldRef<"Connection", 'Tone'>
    readonly sensitiveStatus: FieldRef<"Connection", 'SensitiveStatus'>
    readonly currentDepth: FieldRef<"Connection", 'Int'>
    readonly skipCount: FieldRef<"Connection", 'Int'>
    readonly answerCount: FieldRef<"Connection", 'Int'>
    readonly inviteCode: FieldRef<"Connection", 'String'>
    readonly createdAt: FieldRef<"Connection", 'DateTime'>
    readonly updatedAt: FieldRef<"Connection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Connection findUnique
   */
  export type ConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection findUniqueOrThrow
   */
  export type ConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection findFirst
   */
  export type ConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connections.
     */
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection findFirstOrThrow
   */
  export type ConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connections.
     */
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection findMany
   */
  export type ConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connections to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection create
   */
  export type ConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Connection.
     */
    data: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
  }

  /**
   * Connection createMany
   */
  export type ConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Connections.
     */
    data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Connection createManyAndReturn
   */
  export type ConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many Connections.
     */
    data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Connection update
   */
  export type ConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Connection.
     */
    data: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
    /**
     * Choose, which Connection to update.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection updateMany
   */
  export type ConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Connections.
     */
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyInput>
    /**
     * Filter which Connections to update
     */
    where?: ConnectionWhereInput
    /**
     * Limit how many Connections to update.
     */
    limit?: number
  }

  /**
   * Connection updateManyAndReturn
   */
  export type ConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * The data used to update Connections.
     */
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyInput>
    /**
     * Filter which Connections to update
     */
    where?: ConnectionWhereInput
    /**
     * Limit how many Connections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Connection upsert
   */
  export type ConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Connection to update in case it exists.
     */
    where: ConnectionWhereUniqueInput
    /**
     * In case the Connection found by the `where` argument doesn't exist, create a new Connection with this data.
     */
    create: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
    /**
     * In case the Connection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
  }

  /**
   * Connection delete
   */
  export type ConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter which Connection to delete.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection deleteMany
   */
  export type ConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connections to delete
     */
    where?: ConnectionWhereInput
    /**
     * Limit how many Connections to delete.
     */
    limit?: number
  }

  /**
   * Connection.questions
   */
  export type Connection$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Connection.bookEditions
   */
  export type Connection$bookEditionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    where?: BookEditionWhereInput
    orderBy?: BookEditionOrderByWithRelationInput | BookEditionOrderByWithRelationInput[]
    cursor?: BookEditionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookEditionScalarFieldEnum | BookEditionScalarFieldEnum[]
  }

  /**
   * Connection.invite
   */
  export type Connection$inviteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    where?: ConnectionInviteWhereInput
  }

  /**
   * Connection without action
   */
  export type ConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
  }


  /**
   * Model ConnectionInvite
   */

  export type AggregateConnectionInvite = {
    _count: ConnectionInviteCountAggregateOutputType | null
    _avg: ConnectionInviteAvgAggregateOutputType | null
    _sum: ConnectionInviteSumAggregateOutputType | null
    _min: ConnectionInviteMinAggregateOutputType | null
    _max: ConnectionInviteMaxAggregateOutputType | null
  }

  export type ConnectionInviteAvgAggregateOutputType = {
    intimacy: number | null
  }

  export type ConnectionInviteSumAggregateOutputType = {
    intimacy: number | null
  }

  export type ConnectionInviteMinAggregateOutputType = {
    id: string | null
    code: string | null
    childId: string | null
    acceptedById: string | null
    connectionId: string | null
    tone: $Enums.Tone | null
    intimacy: number | null
    cohabiting: boolean | null
    responseChannel: string | null
    createdAt: Date | null
    acceptedAt: Date | null
    expiresAt: Date | null
  }

  export type ConnectionInviteMaxAggregateOutputType = {
    id: string | null
    code: string | null
    childId: string | null
    acceptedById: string | null
    connectionId: string | null
    tone: $Enums.Tone | null
    intimacy: number | null
    cohabiting: boolean | null
    responseChannel: string | null
    createdAt: Date | null
    acceptedAt: Date | null
    expiresAt: Date | null
  }

  export type ConnectionInviteCountAggregateOutputType = {
    id: number
    code: number
    childId: number
    acceptedById: number
    connectionId: number
    tone: number
    intimacy: number
    cohabiting: number
    responseChannel: number
    createdAt: number
    acceptedAt: number
    expiresAt: number
    _all: number
  }


  export type ConnectionInviteAvgAggregateInputType = {
    intimacy?: true
  }

  export type ConnectionInviteSumAggregateInputType = {
    intimacy?: true
  }

  export type ConnectionInviteMinAggregateInputType = {
    id?: true
    code?: true
    childId?: true
    acceptedById?: true
    connectionId?: true
    tone?: true
    intimacy?: true
    cohabiting?: true
    responseChannel?: true
    createdAt?: true
    acceptedAt?: true
    expiresAt?: true
  }

  export type ConnectionInviteMaxAggregateInputType = {
    id?: true
    code?: true
    childId?: true
    acceptedById?: true
    connectionId?: true
    tone?: true
    intimacy?: true
    cohabiting?: true
    responseChannel?: true
    createdAt?: true
    acceptedAt?: true
    expiresAt?: true
  }

  export type ConnectionInviteCountAggregateInputType = {
    id?: true
    code?: true
    childId?: true
    acceptedById?: true
    connectionId?: true
    tone?: true
    intimacy?: true
    cohabiting?: true
    responseChannel?: true
    createdAt?: true
    acceptedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type ConnectionInviteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConnectionInvite to aggregate.
     */
    where?: ConnectionInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectionInvites to fetch.
     */
    orderBy?: ConnectionInviteOrderByWithRelationInput | ConnectionInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConnectionInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectionInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectionInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConnectionInvites
    **/
    _count?: true | ConnectionInviteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConnectionInviteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConnectionInviteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConnectionInviteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConnectionInviteMaxAggregateInputType
  }

  export type GetConnectionInviteAggregateType<T extends ConnectionInviteAggregateArgs> = {
        [P in keyof T & keyof AggregateConnectionInvite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConnectionInvite[P]>
      : GetScalarType<T[P], AggregateConnectionInvite[P]>
  }




  export type ConnectionInviteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionInviteWhereInput
    orderBy?: ConnectionInviteOrderByWithAggregationInput | ConnectionInviteOrderByWithAggregationInput[]
    by: ConnectionInviteScalarFieldEnum[] | ConnectionInviteScalarFieldEnum
    having?: ConnectionInviteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConnectionInviteCountAggregateInputType | true
    _avg?: ConnectionInviteAvgAggregateInputType
    _sum?: ConnectionInviteSumAggregateInputType
    _min?: ConnectionInviteMinAggregateInputType
    _max?: ConnectionInviteMaxAggregateInputType
  }

  export type ConnectionInviteGroupByOutputType = {
    id: string
    code: string
    childId: string
    acceptedById: string | null
    connectionId: string | null
    tone: $Enums.Tone
    intimacy: number
    cohabiting: boolean
    responseChannel: string
    createdAt: Date
    acceptedAt: Date | null
    expiresAt: Date | null
    _count: ConnectionInviteCountAggregateOutputType | null
    _avg: ConnectionInviteAvgAggregateOutputType | null
    _sum: ConnectionInviteSumAggregateOutputType | null
    _min: ConnectionInviteMinAggregateOutputType | null
    _max: ConnectionInviteMaxAggregateOutputType | null
  }

  type GetConnectionInviteGroupByPayload<T extends ConnectionInviteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConnectionInviteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConnectionInviteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConnectionInviteGroupByOutputType[P]>
            : GetScalarType<T[P], ConnectionInviteGroupByOutputType[P]>
        }
      >
    >


  export type ConnectionInviteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    childId?: boolean
    acceptedById?: boolean
    connectionId?: boolean
    tone?: boolean
    intimacy?: boolean
    cohabiting?: boolean
    responseChannel?: boolean
    createdAt?: boolean
    acceptedAt?: boolean
    expiresAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | ConnectionInvite$acceptedByArgs<ExtArgs>
    connection?: boolean | ConnectionInvite$connectionArgs<ExtArgs>
  }, ExtArgs["result"]["connectionInvite"]>

  export type ConnectionInviteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    childId?: boolean
    acceptedById?: boolean
    connectionId?: boolean
    tone?: boolean
    intimacy?: boolean
    cohabiting?: boolean
    responseChannel?: boolean
    createdAt?: boolean
    acceptedAt?: boolean
    expiresAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | ConnectionInvite$acceptedByArgs<ExtArgs>
    connection?: boolean | ConnectionInvite$connectionArgs<ExtArgs>
  }, ExtArgs["result"]["connectionInvite"]>

  export type ConnectionInviteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    childId?: boolean
    acceptedById?: boolean
    connectionId?: boolean
    tone?: boolean
    intimacy?: boolean
    cohabiting?: boolean
    responseChannel?: boolean
    createdAt?: boolean
    acceptedAt?: boolean
    expiresAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | ConnectionInvite$acceptedByArgs<ExtArgs>
    connection?: boolean | ConnectionInvite$connectionArgs<ExtArgs>
  }, ExtArgs["result"]["connectionInvite"]>

  export type ConnectionInviteSelectScalar = {
    id?: boolean
    code?: boolean
    childId?: boolean
    acceptedById?: boolean
    connectionId?: boolean
    tone?: boolean
    intimacy?: boolean
    cohabiting?: boolean
    responseChannel?: boolean
    createdAt?: boolean
    acceptedAt?: boolean
    expiresAt?: boolean
  }

  export type ConnectionInviteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "childId" | "acceptedById" | "connectionId" | "tone" | "intimacy" | "cohabiting" | "responseChannel" | "createdAt" | "acceptedAt" | "expiresAt", ExtArgs["result"]["connectionInvite"]>
  export type ConnectionInviteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | ConnectionInvite$acceptedByArgs<ExtArgs>
    connection?: boolean | ConnectionInvite$connectionArgs<ExtArgs>
  }
  export type ConnectionInviteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | ConnectionInvite$acceptedByArgs<ExtArgs>
    connection?: boolean | ConnectionInvite$connectionArgs<ExtArgs>
  }
  export type ConnectionInviteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    acceptedBy?: boolean | ConnectionInvite$acceptedByArgs<ExtArgs>
    connection?: boolean | ConnectionInvite$connectionArgs<ExtArgs>
  }

  export type $ConnectionInvitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConnectionInvite"
    objects: {
      child: Prisma.$UserPayload<ExtArgs>
      acceptedBy: Prisma.$UserPayload<ExtArgs> | null
      connection: Prisma.$ConnectionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      childId: string
      acceptedById: string | null
      connectionId: string | null
      tone: $Enums.Tone
      intimacy: number
      cohabiting: boolean
      responseChannel: string
      createdAt: Date
      acceptedAt: Date | null
      expiresAt: Date | null
    }, ExtArgs["result"]["connectionInvite"]>
    composites: {}
  }

  type ConnectionInviteGetPayload<S extends boolean | null | undefined | ConnectionInviteDefaultArgs> = $Result.GetResult<Prisma.$ConnectionInvitePayload, S>

  type ConnectionInviteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConnectionInviteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConnectionInviteCountAggregateInputType | true
    }

  export interface ConnectionInviteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConnectionInvite'], meta: { name: 'ConnectionInvite' } }
    /**
     * Find zero or one ConnectionInvite that matches the filter.
     * @param {ConnectionInviteFindUniqueArgs} args - Arguments to find a ConnectionInvite
     * @example
     * // Get one ConnectionInvite
     * const connectionInvite = await prisma.connectionInvite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConnectionInviteFindUniqueArgs>(args: SelectSubset<T, ConnectionInviteFindUniqueArgs<ExtArgs>>): Prisma__ConnectionInviteClient<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConnectionInvite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConnectionInviteFindUniqueOrThrowArgs} args - Arguments to find a ConnectionInvite
     * @example
     * // Get one ConnectionInvite
     * const connectionInvite = await prisma.connectionInvite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConnectionInviteFindUniqueOrThrowArgs>(args: SelectSubset<T, ConnectionInviteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConnectionInviteClient<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConnectionInvite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionInviteFindFirstArgs} args - Arguments to find a ConnectionInvite
     * @example
     * // Get one ConnectionInvite
     * const connectionInvite = await prisma.connectionInvite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConnectionInviteFindFirstArgs>(args?: SelectSubset<T, ConnectionInviteFindFirstArgs<ExtArgs>>): Prisma__ConnectionInviteClient<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConnectionInvite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionInviteFindFirstOrThrowArgs} args - Arguments to find a ConnectionInvite
     * @example
     * // Get one ConnectionInvite
     * const connectionInvite = await prisma.connectionInvite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConnectionInviteFindFirstOrThrowArgs>(args?: SelectSubset<T, ConnectionInviteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConnectionInviteClient<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConnectionInvites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionInviteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConnectionInvites
     * const connectionInvites = await prisma.connectionInvite.findMany()
     * 
     * // Get first 10 ConnectionInvites
     * const connectionInvites = await prisma.connectionInvite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const connectionInviteWithIdOnly = await prisma.connectionInvite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConnectionInviteFindManyArgs>(args?: SelectSubset<T, ConnectionInviteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConnectionInvite.
     * @param {ConnectionInviteCreateArgs} args - Arguments to create a ConnectionInvite.
     * @example
     * // Create one ConnectionInvite
     * const ConnectionInvite = await prisma.connectionInvite.create({
     *   data: {
     *     // ... data to create a ConnectionInvite
     *   }
     * })
     * 
     */
    create<T extends ConnectionInviteCreateArgs>(args: SelectSubset<T, ConnectionInviteCreateArgs<ExtArgs>>): Prisma__ConnectionInviteClient<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConnectionInvites.
     * @param {ConnectionInviteCreateManyArgs} args - Arguments to create many ConnectionInvites.
     * @example
     * // Create many ConnectionInvites
     * const connectionInvite = await prisma.connectionInvite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConnectionInviteCreateManyArgs>(args?: SelectSubset<T, ConnectionInviteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConnectionInvites and returns the data saved in the database.
     * @param {ConnectionInviteCreateManyAndReturnArgs} args - Arguments to create many ConnectionInvites.
     * @example
     * // Create many ConnectionInvites
     * const connectionInvite = await prisma.connectionInvite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConnectionInvites and only return the `id`
     * const connectionInviteWithIdOnly = await prisma.connectionInvite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConnectionInviteCreateManyAndReturnArgs>(args?: SelectSubset<T, ConnectionInviteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConnectionInvite.
     * @param {ConnectionInviteDeleteArgs} args - Arguments to delete one ConnectionInvite.
     * @example
     * // Delete one ConnectionInvite
     * const ConnectionInvite = await prisma.connectionInvite.delete({
     *   where: {
     *     // ... filter to delete one ConnectionInvite
     *   }
     * })
     * 
     */
    delete<T extends ConnectionInviteDeleteArgs>(args: SelectSubset<T, ConnectionInviteDeleteArgs<ExtArgs>>): Prisma__ConnectionInviteClient<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConnectionInvite.
     * @param {ConnectionInviteUpdateArgs} args - Arguments to update one ConnectionInvite.
     * @example
     * // Update one ConnectionInvite
     * const connectionInvite = await prisma.connectionInvite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConnectionInviteUpdateArgs>(args: SelectSubset<T, ConnectionInviteUpdateArgs<ExtArgs>>): Prisma__ConnectionInviteClient<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConnectionInvites.
     * @param {ConnectionInviteDeleteManyArgs} args - Arguments to filter ConnectionInvites to delete.
     * @example
     * // Delete a few ConnectionInvites
     * const { count } = await prisma.connectionInvite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConnectionInviteDeleteManyArgs>(args?: SelectSubset<T, ConnectionInviteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConnectionInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionInviteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConnectionInvites
     * const connectionInvite = await prisma.connectionInvite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConnectionInviteUpdateManyArgs>(args: SelectSubset<T, ConnectionInviteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConnectionInvites and returns the data updated in the database.
     * @param {ConnectionInviteUpdateManyAndReturnArgs} args - Arguments to update many ConnectionInvites.
     * @example
     * // Update many ConnectionInvites
     * const connectionInvite = await prisma.connectionInvite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConnectionInvites and only return the `id`
     * const connectionInviteWithIdOnly = await prisma.connectionInvite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConnectionInviteUpdateManyAndReturnArgs>(args: SelectSubset<T, ConnectionInviteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConnectionInvite.
     * @param {ConnectionInviteUpsertArgs} args - Arguments to update or create a ConnectionInvite.
     * @example
     * // Update or create a ConnectionInvite
     * const connectionInvite = await prisma.connectionInvite.upsert({
     *   create: {
     *     // ... data to create a ConnectionInvite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConnectionInvite we want to update
     *   }
     * })
     */
    upsert<T extends ConnectionInviteUpsertArgs>(args: SelectSubset<T, ConnectionInviteUpsertArgs<ExtArgs>>): Prisma__ConnectionInviteClient<$Result.GetResult<Prisma.$ConnectionInvitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConnectionInvites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionInviteCountArgs} args - Arguments to filter ConnectionInvites to count.
     * @example
     * // Count the number of ConnectionInvites
     * const count = await prisma.connectionInvite.count({
     *   where: {
     *     // ... the filter for the ConnectionInvites we want to count
     *   }
     * })
    **/
    count<T extends ConnectionInviteCountArgs>(
      args?: Subset<T, ConnectionInviteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConnectionInviteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConnectionInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionInviteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConnectionInviteAggregateArgs>(args: Subset<T, ConnectionInviteAggregateArgs>): Prisma.PrismaPromise<GetConnectionInviteAggregateType<T>>

    /**
     * Group by ConnectionInvite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionInviteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConnectionInviteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConnectionInviteGroupByArgs['orderBy'] }
        : { orderBy?: ConnectionInviteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConnectionInviteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConnectionInviteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConnectionInvite model
   */
  readonly fields: ConnectionInviteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConnectionInvite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConnectionInviteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    acceptedBy<T extends ConnectionInvite$acceptedByArgs<ExtArgs> = {}>(args?: Subset<T, ConnectionInvite$acceptedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    connection<T extends ConnectionInvite$connectionArgs<ExtArgs> = {}>(args?: Subset<T, ConnectionInvite$connectionArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConnectionInvite model
   */
  interface ConnectionInviteFieldRefs {
    readonly id: FieldRef<"ConnectionInvite", 'String'>
    readonly code: FieldRef<"ConnectionInvite", 'String'>
    readonly childId: FieldRef<"ConnectionInvite", 'String'>
    readonly acceptedById: FieldRef<"ConnectionInvite", 'String'>
    readonly connectionId: FieldRef<"ConnectionInvite", 'String'>
    readonly tone: FieldRef<"ConnectionInvite", 'Tone'>
    readonly intimacy: FieldRef<"ConnectionInvite", 'Int'>
    readonly cohabiting: FieldRef<"ConnectionInvite", 'Boolean'>
    readonly responseChannel: FieldRef<"ConnectionInvite", 'String'>
    readonly createdAt: FieldRef<"ConnectionInvite", 'DateTime'>
    readonly acceptedAt: FieldRef<"ConnectionInvite", 'DateTime'>
    readonly expiresAt: FieldRef<"ConnectionInvite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConnectionInvite findUnique
   */
  export type ConnectionInviteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectionInvite to fetch.
     */
    where: ConnectionInviteWhereUniqueInput
  }

  /**
   * ConnectionInvite findUniqueOrThrow
   */
  export type ConnectionInviteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectionInvite to fetch.
     */
    where: ConnectionInviteWhereUniqueInput
  }

  /**
   * ConnectionInvite findFirst
   */
  export type ConnectionInviteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectionInvite to fetch.
     */
    where?: ConnectionInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectionInvites to fetch.
     */
    orderBy?: ConnectionInviteOrderByWithRelationInput | ConnectionInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConnectionInvites.
     */
    cursor?: ConnectionInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectionInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectionInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConnectionInvites.
     */
    distinct?: ConnectionInviteScalarFieldEnum | ConnectionInviteScalarFieldEnum[]
  }

  /**
   * ConnectionInvite findFirstOrThrow
   */
  export type ConnectionInviteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectionInvite to fetch.
     */
    where?: ConnectionInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectionInvites to fetch.
     */
    orderBy?: ConnectionInviteOrderByWithRelationInput | ConnectionInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConnectionInvites.
     */
    cursor?: ConnectionInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectionInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectionInvites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConnectionInvites.
     */
    distinct?: ConnectionInviteScalarFieldEnum | ConnectionInviteScalarFieldEnum[]
  }

  /**
   * ConnectionInvite findMany
   */
  export type ConnectionInviteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    /**
     * Filter, which ConnectionInvites to fetch.
     */
    where?: ConnectionInviteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConnectionInvites to fetch.
     */
    orderBy?: ConnectionInviteOrderByWithRelationInput | ConnectionInviteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConnectionInvites.
     */
    cursor?: ConnectionInviteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConnectionInvites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConnectionInvites.
     */
    skip?: number
    distinct?: ConnectionInviteScalarFieldEnum | ConnectionInviteScalarFieldEnum[]
  }

  /**
   * ConnectionInvite create
   */
  export type ConnectionInviteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    /**
     * The data needed to create a ConnectionInvite.
     */
    data: XOR<ConnectionInviteCreateInput, ConnectionInviteUncheckedCreateInput>
  }

  /**
   * ConnectionInvite createMany
   */
  export type ConnectionInviteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConnectionInvites.
     */
    data: ConnectionInviteCreateManyInput | ConnectionInviteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConnectionInvite createManyAndReturn
   */
  export type ConnectionInviteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * The data used to create many ConnectionInvites.
     */
    data: ConnectionInviteCreateManyInput | ConnectionInviteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConnectionInvite update
   */
  export type ConnectionInviteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    /**
     * The data needed to update a ConnectionInvite.
     */
    data: XOR<ConnectionInviteUpdateInput, ConnectionInviteUncheckedUpdateInput>
    /**
     * Choose, which ConnectionInvite to update.
     */
    where: ConnectionInviteWhereUniqueInput
  }

  /**
   * ConnectionInvite updateMany
   */
  export type ConnectionInviteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConnectionInvites.
     */
    data: XOR<ConnectionInviteUpdateManyMutationInput, ConnectionInviteUncheckedUpdateManyInput>
    /**
     * Filter which ConnectionInvites to update
     */
    where?: ConnectionInviteWhereInput
    /**
     * Limit how many ConnectionInvites to update.
     */
    limit?: number
  }

  /**
   * ConnectionInvite updateManyAndReturn
   */
  export type ConnectionInviteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * The data used to update ConnectionInvites.
     */
    data: XOR<ConnectionInviteUpdateManyMutationInput, ConnectionInviteUncheckedUpdateManyInput>
    /**
     * Filter which ConnectionInvites to update
     */
    where?: ConnectionInviteWhereInput
    /**
     * Limit how many ConnectionInvites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConnectionInvite upsert
   */
  export type ConnectionInviteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    /**
     * The filter to search for the ConnectionInvite to update in case it exists.
     */
    where: ConnectionInviteWhereUniqueInput
    /**
     * In case the ConnectionInvite found by the `where` argument doesn't exist, create a new ConnectionInvite with this data.
     */
    create: XOR<ConnectionInviteCreateInput, ConnectionInviteUncheckedCreateInput>
    /**
     * In case the ConnectionInvite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConnectionInviteUpdateInput, ConnectionInviteUncheckedUpdateInput>
  }

  /**
   * ConnectionInvite delete
   */
  export type ConnectionInviteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
    /**
     * Filter which ConnectionInvite to delete.
     */
    where: ConnectionInviteWhereUniqueInput
  }

  /**
   * ConnectionInvite deleteMany
   */
  export type ConnectionInviteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConnectionInvites to delete
     */
    where?: ConnectionInviteWhereInput
    /**
     * Limit how many ConnectionInvites to delete.
     */
    limit?: number
  }

  /**
   * ConnectionInvite.acceptedBy
   */
  export type ConnectionInvite$acceptedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ConnectionInvite.connection
   */
  export type ConnectionInvite$connectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    where?: ConnectionWhereInput
  }

  /**
   * ConnectionInvite without action
   */
  export type ConnectionInviteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConnectionInvite
     */
    select?: ConnectionInviteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConnectionInvite
     */
    omit?: ConnectionInviteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInviteInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionAvgAggregateOutputType = {
    depth: number | null
  }

  export type QuestionSumAggregateOutputType = {
    depth: number | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    connectionId: string | null
    body: string | null
    depth: number | null
    chapterTag: string | null
    personTag: string | null
    eraTag: string | null
    source: $Enums.QuestionSource | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    connectionId: string | null
    body: string | null
    depth: number | null
    chapterTag: string | null
    personTag: string | null
    eraTag: string | null
    source: $Enums.QuestionSource | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    connectionId: number
    body: number
    depth: number
    chapterTag: number
    personTag: number
    eraTag: number
    source: number
    sentAt: number
    createdAt: number
    _all: number
  }


  export type QuestionAvgAggregateInputType = {
    depth?: true
  }

  export type QuestionSumAggregateInputType = {
    depth?: true
  }

  export type QuestionMinAggregateInputType = {
    id?: true
    connectionId?: true
    body?: true
    depth?: true
    chapterTag?: true
    personTag?: true
    eraTag?: true
    source?: true
    sentAt?: true
    createdAt?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    connectionId?: true
    body?: true
    depth?: true
    chapterTag?: true
    personTag?: true
    eraTag?: true
    source?: true
    sentAt?: true
    createdAt?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    connectionId?: true
    body?: true
    depth?: true
    chapterTag?: true
    personTag?: true
    eraTag?: true
    source?: true
    sentAt?: true
    createdAt?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _avg?: QuestionAvgAggregateInputType
    _sum?: QuestionSumAggregateInputType
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    connectionId: string
    body: string
    depth: number
    chapterTag: string | null
    personTag: string | null
    eraTag: string | null
    source: $Enums.QuestionSource
    sentAt: Date | null
    createdAt: Date
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    body?: boolean
    depth?: boolean
    chapterTag?: boolean
    personTag?: boolean
    eraTag?: boolean
    source?: boolean
    sentAt?: boolean
    createdAt?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    answer?: boolean | Question$answerArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    body?: boolean
    depth?: boolean
    chapterTag?: boolean
    personTag?: boolean
    eraTag?: boolean
    source?: boolean
    sentAt?: boolean
    createdAt?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    body?: boolean
    depth?: boolean
    chapterTag?: boolean
    personTag?: boolean
    eraTag?: boolean
    source?: boolean
    sentAt?: boolean
    createdAt?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    connectionId?: boolean
    body?: boolean
    depth?: boolean
    chapterTag?: boolean
    personTag?: boolean
    eraTag?: boolean
    source?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }

  export type QuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "connectionId" | "body" | "depth" | "chapterTag" | "personTag" | "eraTag" | "source" | "sentAt" | "createdAt", ExtArgs["result"]["question"]>
  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
    answer?: boolean | Question$answerArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      connection: Prisma.$ConnectionPayload<ExtArgs>
      answer: Prisma.$AnswerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      connectionId: string
      body: string
      depth: number
      chapterTag: string | null
      personTag: string | null
      eraTag: string | null
      source: $Enums.QuestionSource
      sentAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions and returns the data updated in the database.
     * @param {QuestionUpdateManyAndReturnArgs} args - Arguments to update many Questions.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends ConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConnectionDefaultArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    answer<T extends Question$answerArgs<ExtArgs> = {}>(args?: Subset<T, Question$answerArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly connectionId: FieldRef<"Question", 'String'>
    readonly body: FieldRef<"Question", 'String'>
    readonly depth: FieldRef<"Question", 'Int'>
    readonly chapterTag: FieldRef<"Question", 'String'>
    readonly personTag: FieldRef<"Question", 'String'>
    readonly eraTag: FieldRef<"Question", 'String'>
    readonly source: FieldRef<"Question", 'QuestionSource'>
    readonly sentAt: FieldRef<"Question", 'DateTime'>
    readonly createdAt: FieldRef<"Question", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
  }

  /**
   * Question updateManyAndReturn
   */
  export type QuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to delete.
     */
    limit?: number
  }

  /**
   * Question.answer
   */
  export type Question$answerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    where?: AnswerWhereInput
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model Answer
   */

  export type AggregateAnswer = {
    _count: AnswerCountAggregateOutputType | null
    _min: AnswerMinAggregateOutputType | null
    _max: AnswerMaxAggregateOutputType | null
  }

  export type AnswerMinAggregateOutputType = {
    id: string | null
    questionId: string | null
    format: $Enums.AnswerFormat | null
    origin: $Enums.AnswerOrigin | null
    body: string | null
    mediaUrl: string | null
    transcript: string | null
    skipped: boolean | null
    receivedVia: string | null
    isPrivate: boolean | null
    aiComposed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnswerMaxAggregateOutputType = {
    id: string | null
    questionId: string | null
    format: $Enums.AnswerFormat | null
    origin: $Enums.AnswerOrigin | null
    body: string | null
    mediaUrl: string | null
    transcript: string | null
    skipped: boolean | null
    receivedVia: string | null
    isPrivate: boolean | null
    aiComposed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnswerCountAggregateOutputType = {
    id: number
    questionId: number
    format: number
    origin: number
    body: number
    mediaUrl: number
    transcript: number
    skipped: number
    receivedVia: number
    isPrivate: number
    keywords: number
    aiComposed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnswerMinAggregateInputType = {
    id?: true
    questionId?: true
    format?: true
    origin?: true
    body?: true
    mediaUrl?: true
    transcript?: true
    skipped?: true
    receivedVia?: true
    isPrivate?: true
    aiComposed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnswerMaxAggregateInputType = {
    id?: true
    questionId?: true
    format?: true
    origin?: true
    body?: true
    mediaUrl?: true
    transcript?: true
    skipped?: true
    receivedVia?: true
    isPrivate?: true
    aiComposed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnswerCountAggregateInputType = {
    id?: true
    questionId?: true
    format?: true
    origin?: true
    body?: true
    mediaUrl?: true
    transcript?: true
    skipped?: true
    receivedVia?: true
    isPrivate?: true
    keywords?: true
    aiComposed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Answer to aggregate.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Answers
    **/
    _count?: true | AnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnswerMaxAggregateInputType
  }

  export type GetAnswerAggregateType<T extends AnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnswer[P]>
      : GetScalarType<T[P], AggregateAnswer[P]>
  }




  export type AnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerWhereInput
    orderBy?: AnswerOrderByWithAggregationInput | AnswerOrderByWithAggregationInput[]
    by: AnswerScalarFieldEnum[] | AnswerScalarFieldEnum
    having?: AnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnswerCountAggregateInputType | true
    _min?: AnswerMinAggregateInputType
    _max?: AnswerMaxAggregateInputType
  }

  export type AnswerGroupByOutputType = {
    id: string
    questionId: string
    format: $Enums.AnswerFormat
    origin: $Enums.AnswerOrigin
    body: string | null
    mediaUrl: string | null
    transcript: string | null
    skipped: boolean
    receivedVia: string
    isPrivate: boolean
    keywords: string[]
    aiComposed: boolean
    createdAt: Date
    updatedAt: Date
    _count: AnswerCountAggregateOutputType | null
    _min: AnswerMinAggregateOutputType | null
    _max: AnswerMaxAggregateOutputType | null
  }

  type GetAnswerGroupByPayload<T extends AnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnswerGroupByOutputType[P]>
            : GetScalarType<T[P], AnswerGroupByOutputType[P]>
        }
      >
    >


  export type AnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    format?: boolean
    origin?: boolean
    body?: boolean
    mediaUrl?: boolean
    transcript?: boolean
    skipped?: boolean
    receivedVia?: boolean
    isPrivate?: boolean
    keywords?: boolean
    aiComposed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    reactions?: boolean | Answer$reactionsArgs<ExtArgs>
    _count?: boolean | AnswerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    format?: boolean
    origin?: boolean
    body?: boolean
    mediaUrl?: boolean
    transcript?: boolean
    skipped?: boolean
    receivedVia?: boolean
    isPrivate?: boolean
    keywords?: boolean
    aiComposed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    format?: boolean
    origin?: boolean
    body?: boolean
    mediaUrl?: boolean
    transcript?: boolean
    skipped?: boolean
    receivedVia?: boolean
    isPrivate?: boolean
    keywords?: boolean
    aiComposed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectScalar = {
    id?: boolean
    questionId?: boolean
    format?: boolean
    origin?: boolean
    body?: boolean
    mediaUrl?: boolean
    transcript?: boolean
    skipped?: boolean
    receivedVia?: boolean
    isPrivate?: boolean
    keywords?: boolean
    aiComposed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "questionId" | "format" | "origin" | "body" | "mediaUrl" | "transcript" | "skipped" | "receivedVia" | "isPrivate" | "keywords" | "aiComposed" | "createdAt" | "updatedAt", ExtArgs["result"]["answer"]>
  export type AnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    reactions?: boolean | Answer$reactionsArgs<ExtArgs>
    _count?: boolean | AnswerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type AnswerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $AnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Answer"
    objects: {
      question: Prisma.$QuestionPayload<ExtArgs>
      reactions: Prisma.$ReactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      questionId: string
      format: $Enums.AnswerFormat
      origin: $Enums.AnswerOrigin
      body: string | null
      mediaUrl: string | null
      transcript: string | null
      skipped: boolean
      receivedVia: string
      isPrivate: boolean
      keywords: string[]
      aiComposed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["answer"]>
    composites: {}
  }

  type AnswerGetPayload<S extends boolean | null | undefined | AnswerDefaultArgs> = $Result.GetResult<Prisma.$AnswerPayload, S>

  type AnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnswerCountAggregateInputType | true
    }

  export interface AnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Answer'], meta: { name: 'Answer' } }
    /**
     * Find zero or one Answer that matches the filter.
     * @param {AnswerFindUniqueArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnswerFindUniqueArgs>(args: SelectSubset<T, AnswerFindUniqueArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Answer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnswerFindUniqueOrThrowArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, AnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Answer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindFirstArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnswerFindFirstArgs>(args?: SelectSubset<T, AnswerFindFirstArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Answer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindFirstOrThrowArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, AnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Answers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Answers
     * const answers = await prisma.answer.findMany()
     * 
     * // Get first 10 Answers
     * const answers = await prisma.answer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const answerWithIdOnly = await prisma.answer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnswerFindManyArgs>(args?: SelectSubset<T, AnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Answer.
     * @param {AnswerCreateArgs} args - Arguments to create a Answer.
     * @example
     * // Create one Answer
     * const Answer = await prisma.answer.create({
     *   data: {
     *     // ... data to create a Answer
     *   }
     * })
     * 
     */
    create<T extends AnswerCreateArgs>(args: SelectSubset<T, AnswerCreateArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Answers.
     * @param {AnswerCreateManyArgs} args - Arguments to create many Answers.
     * @example
     * // Create many Answers
     * const answer = await prisma.answer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnswerCreateManyArgs>(args?: SelectSubset<T, AnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Answers and returns the data saved in the database.
     * @param {AnswerCreateManyAndReturnArgs} args - Arguments to create many Answers.
     * @example
     * // Create many Answers
     * const answer = await prisma.answer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Answers and only return the `id`
     * const answerWithIdOnly = await prisma.answer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, AnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Answer.
     * @param {AnswerDeleteArgs} args - Arguments to delete one Answer.
     * @example
     * // Delete one Answer
     * const Answer = await prisma.answer.delete({
     *   where: {
     *     // ... filter to delete one Answer
     *   }
     * })
     * 
     */
    delete<T extends AnswerDeleteArgs>(args: SelectSubset<T, AnswerDeleteArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Answer.
     * @param {AnswerUpdateArgs} args - Arguments to update one Answer.
     * @example
     * // Update one Answer
     * const answer = await prisma.answer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnswerUpdateArgs>(args: SelectSubset<T, AnswerUpdateArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Answers.
     * @param {AnswerDeleteManyArgs} args - Arguments to filter Answers to delete.
     * @example
     * // Delete a few Answers
     * const { count } = await prisma.answer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnswerDeleteManyArgs>(args?: SelectSubset<T, AnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Answers
     * const answer = await prisma.answer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnswerUpdateManyArgs>(args: SelectSubset<T, AnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Answers and returns the data updated in the database.
     * @param {AnswerUpdateManyAndReturnArgs} args - Arguments to update many Answers.
     * @example
     * // Update many Answers
     * const answer = await prisma.answer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Answers and only return the `id`
     * const answerWithIdOnly = await prisma.answer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnswerUpdateManyAndReturnArgs>(args: SelectSubset<T, AnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Answer.
     * @param {AnswerUpsertArgs} args - Arguments to update or create a Answer.
     * @example
     * // Update or create a Answer
     * const answer = await prisma.answer.upsert({
     *   create: {
     *     // ... data to create a Answer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Answer we want to update
     *   }
     * })
     */
    upsert<T extends AnswerUpsertArgs>(args: SelectSubset<T, AnswerUpsertArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerCountArgs} args - Arguments to filter Answers to count.
     * @example
     * // Count the number of Answers
     * const count = await prisma.answer.count({
     *   where: {
     *     // ... the filter for the Answers we want to count
     *   }
     * })
    **/
    count<T extends AnswerCountArgs>(
      args?: Subset<T, AnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Answer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnswerAggregateArgs>(args: Subset<T, AnswerAggregateArgs>): Prisma.PrismaPromise<GetAnswerAggregateType<T>>

    /**
     * Group by Answer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnswerGroupByArgs['orderBy'] }
        : { orderBy?: AnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Answer model
   */
  readonly fields: AnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Answer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reactions<T extends Answer$reactionsArgs<ExtArgs> = {}>(args?: Subset<T, Answer$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Answer model
   */
  interface AnswerFieldRefs {
    readonly id: FieldRef<"Answer", 'String'>
    readonly questionId: FieldRef<"Answer", 'String'>
    readonly format: FieldRef<"Answer", 'AnswerFormat'>
    readonly origin: FieldRef<"Answer", 'AnswerOrigin'>
    readonly body: FieldRef<"Answer", 'String'>
    readonly mediaUrl: FieldRef<"Answer", 'String'>
    readonly transcript: FieldRef<"Answer", 'String'>
    readonly skipped: FieldRef<"Answer", 'Boolean'>
    readonly receivedVia: FieldRef<"Answer", 'String'>
    readonly isPrivate: FieldRef<"Answer", 'Boolean'>
    readonly keywords: FieldRef<"Answer", 'String[]'>
    readonly aiComposed: FieldRef<"Answer", 'Boolean'>
    readonly createdAt: FieldRef<"Answer", 'DateTime'>
    readonly updatedAt: FieldRef<"Answer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Answer findUnique
   */
  export type AnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer findUniqueOrThrow
   */
  export type AnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer findFirst
   */
  export type AnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Answers.
     */
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Answer findFirstOrThrow
   */
  export type AnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Answers.
     */
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Answer findMany
   */
  export type AnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answers to fetch.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Answer create
   */
  export type AnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a Answer.
     */
    data: XOR<AnswerCreateInput, AnswerUncheckedCreateInput>
  }

  /**
   * Answer createMany
   */
  export type AnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Answers.
     */
    data: AnswerCreateManyInput | AnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Answer createManyAndReturn
   */
  export type AnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * The data used to create many Answers.
     */
    data: AnswerCreateManyInput | AnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Answer update
   */
  export type AnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a Answer.
     */
    data: XOR<AnswerUpdateInput, AnswerUncheckedUpdateInput>
    /**
     * Choose, which Answer to update.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer updateMany
   */
  export type AnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Answers.
     */
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyInput>
    /**
     * Filter which Answers to update
     */
    where?: AnswerWhereInput
    /**
     * Limit how many Answers to update.
     */
    limit?: number
  }

  /**
   * Answer updateManyAndReturn
   */
  export type AnswerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * The data used to update Answers.
     */
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyInput>
    /**
     * Filter which Answers to update
     */
    where?: AnswerWhereInput
    /**
     * Limit how many Answers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Answer upsert
   */
  export type AnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the Answer to update in case it exists.
     */
    where: AnswerWhereUniqueInput
    /**
     * In case the Answer found by the `where` argument doesn't exist, create a new Answer with this data.
     */
    create: XOR<AnswerCreateInput, AnswerUncheckedCreateInput>
    /**
     * In case the Answer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnswerUpdateInput, AnswerUncheckedUpdateInput>
  }

  /**
   * Answer delete
   */
  export type AnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter which Answer to delete.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer deleteMany
   */
  export type AnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Answers to delete
     */
    where?: AnswerWhereInput
    /**
     * Limit how many Answers to delete.
     */
    limit?: number
  }

  /**
   * Answer.reactions
   */
  export type Answer$reactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    where?: ReactionWhereInput
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    cursor?: ReactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Answer without action
   */
  export type AnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
  }


  /**
   * Model Reaction
   */

  export type AggregateReaction = {
    _count: ReactionCountAggregateOutputType | null
    _min: ReactionMinAggregateOutputType | null
    _max: ReactionMaxAggregateOutputType | null
  }

  export type ReactionMinAggregateOutputType = {
    id: string | null
    answerId: string | null
    userId: string | null
    emoji: string | null
    comment: string | null
    isFollowup: boolean | null
    notified: boolean | null
    createdAt: Date | null
  }

  export type ReactionMaxAggregateOutputType = {
    id: string | null
    answerId: string | null
    userId: string | null
    emoji: string | null
    comment: string | null
    isFollowup: boolean | null
    notified: boolean | null
    createdAt: Date | null
  }

  export type ReactionCountAggregateOutputType = {
    id: number
    answerId: number
    userId: number
    emoji: number
    comment: number
    isFollowup: number
    notified: number
    createdAt: number
    _all: number
  }


  export type ReactionMinAggregateInputType = {
    id?: true
    answerId?: true
    userId?: true
    emoji?: true
    comment?: true
    isFollowup?: true
    notified?: true
    createdAt?: true
  }

  export type ReactionMaxAggregateInputType = {
    id?: true
    answerId?: true
    userId?: true
    emoji?: true
    comment?: true
    isFollowup?: true
    notified?: true
    createdAt?: true
  }

  export type ReactionCountAggregateInputType = {
    id?: true
    answerId?: true
    userId?: true
    emoji?: true
    comment?: true
    isFollowup?: true
    notified?: true
    createdAt?: true
    _all?: true
  }

  export type ReactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reaction to aggregate.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reactions
    **/
    _count?: true | ReactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReactionMaxAggregateInputType
  }

  export type GetReactionAggregateType<T extends ReactionAggregateArgs> = {
        [P in keyof T & keyof AggregateReaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReaction[P]>
      : GetScalarType<T[P], AggregateReaction[P]>
  }




  export type ReactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReactionWhereInput
    orderBy?: ReactionOrderByWithAggregationInput | ReactionOrderByWithAggregationInput[]
    by: ReactionScalarFieldEnum[] | ReactionScalarFieldEnum
    having?: ReactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReactionCountAggregateInputType | true
    _min?: ReactionMinAggregateInputType
    _max?: ReactionMaxAggregateInputType
  }

  export type ReactionGroupByOutputType = {
    id: string
    answerId: string
    userId: string
    emoji: string | null
    comment: string | null
    isFollowup: boolean
    notified: boolean
    createdAt: Date
    _count: ReactionCountAggregateOutputType | null
    _min: ReactionMinAggregateOutputType | null
    _max: ReactionMaxAggregateOutputType | null
  }

  type GetReactionGroupByPayload<T extends ReactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReactionGroupByOutputType[P]>
            : GetScalarType<T[P], ReactionGroupByOutputType[P]>
        }
      >
    >


  export type ReactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    answerId?: boolean
    userId?: boolean
    emoji?: boolean
    comment?: boolean
    isFollowup?: boolean
    notified?: boolean
    createdAt?: boolean
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reaction"]>

  export type ReactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    answerId?: boolean
    userId?: boolean
    emoji?: boolean
    comment?: boolean
    isFollowup?: boolean
    notified?: boolean
    createdAt?: boolean
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reaction"]>

  export type ReactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    answerId?: boolean
    userId?: boolean
    emoji?: boolean
    comment?: boolean
    isFollowup?: boolean
    notified?: boolean
    createdAt?: boolean
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reaction"]>

  export type ReactionSelectScalar = {
    id?: boolean
    answerId?: boolean
    userId?: boolean
    emoji?: boolean
    comment?: boolean
    isFollowup?: boolean
    notified?: boolean
    createdAt?: boolean
  }

  export type ReactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "answerId" | "userId" | "emoji" | "comment" | "isFollowup" | "notified" | "createdAt", ExtArgs["result"]["reaction"]>
  export type ReactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reaction"
    objects: {
      answer: Prisma.$AnswerPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      answerId: string
      userId: string
      emoji: string | null
      comment: string | null
      isFollowup: boolean
      notified: boolean
      createdAt: Date
    }, ExtArgs["result"]["reaction"]>
    composites: {}
  }

  type ReactionGetPayload<S extends boolean | null | undefined | ReactionDefaultArgs> = $Result.GetResult<Prisma.$ReactionPayload, S>

  type ReactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReactionCountAggregateInputType | true
    }

  export interface ReactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reaction'], meta: { name: 'Reaction' } }
    /**
     * Find zero or one Reaction that matches the filter.
     * @param {ReactionFindUniqueArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReactionFindUniqueArgs>(args: SelectSubset<T, ReactionFindUniqueArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReactionFindUniqueOrThrowArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReactionFindUniqueOrThrowArgs>(args: SelectSubset<T, ReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionFindFirstArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReactionFindFirstArgs>(args?: SelectSubset<T, ReactionFindFirstArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionFindFirstOrThrowArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReactionFindFirstOrThrowArgs>(args?: SelectSubset<T, ReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reactions
     * const reactions = await prisma.reaction.findMany()
     * 
     * // Get first 10 Reactions
     * const reactions = await prisma.reaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reactionWithIdOnly = await prisma.reaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReactionFindManyArgs>(args?: SelectSubset<T, ReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reaction.
     * @param {ReactionCreateArgs} args - Arguments to create a Reaction.
     * @example
     * // Create one Reaction
     * const Reaction = await prisma.reaction.create({
     *   data: {
     *     // ... data to create a Reaction
     *   }
     * })
     * 
     */
    create<T extends ReactionCreateArgs>(args: SelectSubset<T, ReactionCreateArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reactions.
     * @param {ReactionCreateManyArgs} args - Arguments to create many Reactions.
     * @example
     * // Create many Reactions
     * const reaction = await prisma.reaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReactionCreateManyArgs>(args?: SelectSubset<T, ReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reactions and returns the data saved in the database.
     * @param {ReactionCreateManyAndReturnArgs} args - Arguments to create many Reactions.
     * @example
     * // Create many Reactions
     * const reaction = await prisma.reaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reactions and only return the `id`
     * const reactionWithIdOnly = await prisma.reaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReactionCreateManyAndReturnArgs>(args?: SelectSubset<T, ReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reaction.
     * @param {ReactionDeleteArgs} args - Arguments to delete one Reaction.
     * @example
     * // Delete one Reaction
     * const Reaction = await prisma.reaction.delete({
     *   where: {
     *     // ... filter to delete one Reaction
     *   }
     * })
     * 
     */
    delete<T extends ReactionDeleteArgs>(args: SelectSubset<T, ReactionDeleteArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reaction.
     * @param {ReactionUpdateArgs} args - Arguments to update one Reaction.
     * @example
     * // Update one Reaction
     * const reaction = await prisma.reaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReactionUpdateArgs>(args: SelectSubset<T, ReactionUpdateArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reactions.
     * @param {ReactionDeleteManyArgs} args - Arguments to filter Reactions to delete.
     * @example
     * // Delete a few Reactions
     * const { count } = await prisma.reaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReactionDeleteManyArgs>(args?: SelectSubset<T, ReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reactions
     * const reaction = await prisma.reaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReactionUpdateManyArgs>(args: SelectSubset<T, ReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reactions and returns the data updated in the database.
     * @param {ReactionUpdateManyAndReturnArgs} args - Arguments to update many Reactions.
     * @example
     * // Update many Reactions
     * const reaction = await prisma.reaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reactions and only return the `id`
     * const reactionWithIdOnly = await prisma.reaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReactionUpdateManyAndReturnArgs>(args: SelectSubset<T, ReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reaction.
     * @param {ReactionUpsertArgs} args - Arguments to update or create a Reaction.
     * @example
     * // Update or create a Reaction
     * const reaction = await prisma.reaction.upsert({
     *   create: {
     *     // ... data to create a Reaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reaction we want to update
     *   }
     * })
     */
    upsert<T extends ReactionUpsertArgs>(args: SelectSubset<T, ReactionUpsertArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionCountArgs} args - Arguments to filter Reactions to count.
     * @example
     * // Count the number of Reactions
     * const count = await prisma.reaction.count({
     *   where: {
     *     // ... the filter for the Reactions we want to count
     *   }
     * })
    **/
    count<T extends ReactionCountArgs>(
      args?: Subset<T, ReactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReactionAggregateArgs>(args: Subset<T, ReactionAggregateArgs>): Prisma.PrismaPromise<GetReactionAggregateType<T>>

    /**
     * Group by Reaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReactionGroupByArgs['orderBy'] }
        : { orderBy?: ReactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reaction model
   */
  readonly fields: ReactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    answer<T extends AnswerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnswerDefaultArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reaction model
   */
  interface ReactionFieldRefs {
    readonly id: FieldRef<"Reaction", 'String'>
    readonly answerId: FieldRef<"Reaction", 'String'>
    readonly userId: FieldRef<"Reaction", 'String'>
    readonly emoji: FieldRef<"Reaction", 'String'>
    readonly comment: FieldRef<"Reaction", 'String'>
    readonly isFollowup: FieldRef<"Reaction", 'Boolean'>
    readonly notified: FieldRef<"Reaction", 'Boolean'>
    readonly createdAt: FieldRef<"Reaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reaction findUnique
   */
  export type ReactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction findUniqueOrThrow
   */
  export type ReactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction findFirst
   */
  export type ReactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reactions.
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reactions.
     */
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Reaction findFirstOrThrow
   */
  export type ReactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reactions.
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reactions.
     */
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Reaction findMany
   */
  export type ReactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reactions to fetch.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reactions.
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Reaction create
   */
  export type ReactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Reaction.
     */
    data: XOR<ReactionCreateInput, ReactionUncheckedCreateInput>
  }

  /**
   * Reaction createMany
   */
  export type ReactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reactions.
     */
    data: ReactionCreateManyInput | ReactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reaction createManyAndReturn
   */
  export type ReactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * The data used to create many Reactions.
     */
    data: ReactionCreateManyInput | ReactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reaction update
   */
  export type ReactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Reaction.
     */
    data: XOR<ReactionUpdateInput, ReactionUncheckedUpdateInput>
    /**
     * Choose, which Reaction to update.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction updateMany
   */
  export type ReactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reactions.
     */
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyInput>
    /**
     * Filter which Reactions to update
     */
    where?: ReactionWhereInput
    /**
     * Limit how many Reactions to update.
     */
    limit?: number
  }

  /**
   * Reaction updateManyAndReturn
   */
  export type ReactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * The data used to update Reactions.
     */
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyInput>
    /**
     * Filter which Reactions to update
     */
    where?: ReactionWhereInput
    /**
     * Limit how many Reactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reaction upsert
   */
  export type ReactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Reaction to update in case it exists.
     */
    where: ReactionWhereUniqueInput
    /**
     * In case the Reaction found by the `where` argument doesn't exist, create a new Reaction with this data.
     */
    create: XOR<ReactionCreateInput, ReactionUncheckedCreateInput>
    /**
     * In case the Reaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReactionUpdateInput, ReactionUncheckedUpdateInput>
  }

  /**
   * Reaction delete
   */
  export type ReactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter which Reaction to delete.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction deleteMany
   */
  export type ReactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reactions to delete
     */
    where?: ReactionWhereInput
    /**
     * Limit how many Reactions to delete.
     */
    limit?: number
  }

  /**
   * Reaction without action
   */
  export type ReactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
  }


  /**
   * Model BookEdition
   */

  export type AggregateBookEdition = {
    _count: BookEditionCountAggregateOutputType | null
    _min: BookEditionMinAggregateOutputType | null
    _max: BookEditionMaxAggregateOutputType | null
  }

  export type BookEditionMinAggregateOutputType = {
    id: string | null
    connectionId: string | null
    rangeFrom: Date | null
    rangeTo: Date | null
    status: $Enums.BookStatus | null
    editionType: $Enums.BookEditionType | null
    pdfUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookEditionMaxAggregateOutputType = {
    id: string | null
    connectionId: string | null
    rangeFrom: Date | null
    rangeTo: Date | null
    status: $Enums.BookStatus | null
    editionType: $Enums.BookEditionType | null
    pdfUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookEditionCountAggregateOutputType = {
    id: number
    connectionId: number
    rangeFrom: number
    rangeTo: number
    status: number
    editionType: number
    chapterData: number
    pdfUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookEditionMinAggregateInputType = {
    id?: true
    connectionId?: true
    rangeFrom?: true
    rangeTo?: true
    status?: true
    editionType?: true
    pdfUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookEditionMaxAggregateInputType = {
    id?: true
    connectionId?: true
    rangeFrom?: true
    rangeTo?: true
    status?: true
    editionType?: true
    pdfUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookEditionCountAggregateInputType = {
    id?: true
    connectionId?: true
    rangeFrom?: true
    rangeTo?: true
    status?: true
    editionType?: true
    chapterData?: true
    pdfUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookEditionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookEdition to aggregate.
     */
    where?: BookEditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookEditions to fetch.
     */
    orderBy?: BookEditionOrderByWithRelationInput | BookEditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookEditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookEditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookEditions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookEditions
    **/
    _count?: true | BookEditionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookEditionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookEditionMaxAggregateInputType
  }

  export type GetBookEditionAggregateType<T extends BookEditionAggregateArgs> = {
        [P in keyof T & keyof AggregateBookEdition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookEdition[P]>
      : GetScalarType<T[P], AggregateBookEdition[P]>
  }




  export type BookEditionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookEditionWhereInput
    orderBy?: BookEditionOrderByWithAggregationInput | BookEditionOrderByWithAggregationInput[]
    by: BookEditionScalarFieldEnum[] | BookEditionScalarFieldEnum
    having?: BookEditionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookEditionCountAggregateInputType | true
    _min?: BookEditionMinAggregateInputType
    _max?: BookEditionMaxAggregateInputType
  }

  export type BookEditionGroupByOutputType = {
    id: string
    connectionId: string
    rangeFrom: Date
    rangeTo: Date | null
    status: $Enums.BookStatus
    editionType: $Enums.BookEditionType
    chapterData: JsonValue | null
    pdfUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: BookEditionCountAggregateOutputType | null
    _min: BookEditionMinAggregateOutputType | null
    _max: BookEditionMaxAggregateOutputType | null
  }

  type GetBookEditionGroupByPayload<T extends BookEditionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookEditionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookEditionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookEditionGroupByOutputType[P]>
            : GetScalarType<T[P], BookEditionGroupByOutputType[P]>
        }
      >
    >


  export type BookEditionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    rangeFrom?: boolean
    rangeTo?: boolean
    status?: boolean
    editionType?: boolean
    chapterData?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookEdition"]>

  export type BookEditionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    rangeFrom?: boolean
    rangeTo?: boolean
    status?: boolean
    editionType?: boolean
    chapterData?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookEdition"]>

  export type BookEditionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    rangeFrom?: boolean
    rangeTo?: boolean
    status?: boolean
    editionType?: boolean
    chapterData?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookEdition"]>

  export type BookEditionSelectScalar = {
    id?: boolean
    connectionId?: boolean
    rangeFrom?: boolean
    rangeTo?: boolean
    status?: boolean
    editionType?: boolean
    chapterData?: boolean
    pdfUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookEditionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "connectionId" | "rangeFrom" | "rangeTo" | "status" | "editionType" | "chapterData" | "pdfUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["bookEdition"]>
  export type BookEditionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }
  export type BookEditionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }
  export type BookEditionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | ConnectionDefaultArgs<ExtArgs>
  }

  export type $BookEditionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookEdition"
    objects: {
      connection: Prisma.$ConnectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      connectionId: string
      rangeFrom: Date
      rangeTo: Date | null
      status: $Enums.BookStatus
      editionType: $Enums.BookEditionType
      chapterData: Prisma.JsonValue | null
      pdfUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bookEdition"]>
    composites: {}
  }

  type BookEditionGetPayload<S extends boolean | null | undefined | BookEditionDefaultArgs> = $Result.GetResult<Prisma.$BookEditionPayload, S>

  type BookEditionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookEditionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookEditionCountAggregateInputType | true
    }

  export interface BookEditionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookEdition'], meta: { name: 'BookEdition' } }
    /**
     * Find zero or one BookEdition that matches the filter.
     * @param {BookEditionFindUniqueArgs} args - Arguments to find a BookEdition
     * @example
     * // Get one BookEdition
     * const bookEdition = await prisma.bookEdition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookEditionFindUniqueArgs>(args: SelectSubset<T, BookEditionFindUniqueArgs<ExtArgs>>): Prisma__BookEditionClient<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookEdition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookEditionFindUniqueOrThrowArgs} args - Arguments to find a BookEdition
     * @example
     * // Get one BookEdition
     * const bookEdition = await prisma.bookEdition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookEditionFindUniqueOrThrowArgs>(args: SelectSubset<T, BookEditionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookEditionClient<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookEdition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookEditionFindFirstArgs} args - Arguments to find a BookEdition
     * @example
     * // Get one BookEdition
     * const bookEdition = await prisma.bookEdition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookEditionFindFirstArgs>(args?: SelectSubset<T, BookEditionFindFirstArgs<ExtArgs>>): Prisma__BookEditionClient<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookEdition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookEditionFindFirstOrThrowArgs} args - Arguments to find a BookEdition
     * @example
     * // Get one BookEdition
     * const bookEdition = await prisma.bookEdition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookEditionFindFirstOrThrowArgs>(args?: SelectSubset<T, BookEditionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookEditionClient<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookEditions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookEditionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookEditions
     * const bookEditions = await prisma.bookEdition.findMany()
     * 
     * // Get first 10 BookEditions
     * const bookEditions = await prisma.bookEdition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookEditionWithIdOnly = await prisma.bookEdition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookEditionFindManyArgs>(args?: SelectSubset<T, BookEditionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookEdition.
     * @param {BookEditionCreateArgs} args - Arguments to create a BookEdition.
     * @example
     * // Create one BookEdition
     * const BookEdition = await prisma.bookEdition.create({
     *   data: {
     *     // ... data to create a BookEdition
     *   }
     * })
     * 
     */
    create<T extends BookEditionCreateArgs>(args: SelectSubset<T, BookEditionCreateArgs<ExtArgs>>): Prisma__BookEditionClient<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookEditions.
     * @param {BookEditionCreateManyArgs} args - Arguments to create many BookEditions.
     * @example
     * // Create many BookEditions
     * const bookEdition = await prisma.bookEdition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookEditionCreateManyArgs>(args?: SelectSubset<T, BookEditionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookEditions and returns the data saved in the database.
     * @param {BookEditionCreateManyAndReturnArgs} args - Arguments to create many BookEditions.
     * @example
     * // Create many BookEditions
     * const bookEdition = await prisma.bookEdition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookEditions and only return the `id`
     * const bookEditionWithIdOnly = await prisma.bookEdition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookEditionCreateManyAndReturnArgs>(args?: SelectSubset<T, BookEditionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookEdition.
     * @param {BookEditionDeleteArgs} args - Arguments to delete one BookEdition.
     * @example
     * // Delete one BookEdition
     * const BookEdition = await prisma.bookEdition.delete({
     *   where: {
     *     // ... filter to delete one BookEdition
     *   }
     * })
     * 
     */
    delete<T extends BookEditionDeleteArgs>(args: SelectSubset<T, BookEditionDeleteArgs<ExtArgs>>): Prisma__BookEditionClient<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookEdition.
     * @param {BookEditionUpdateArgs} args - Arguments to update one BookEdition.
     * @example
     * // Update one BookEdition
     * const bookEdition = await prisma.bookEdition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookEditionUpdateArgs>(args: SelectSubset<T, BookEditionUpdateArgs<ExtArgs>>): Prisma__BookEditionClient<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookEditions.
     * @param {BookEditionDeleteManyArgs} args - Arguments to filter BookEditions to delete.
     * @example
     * // Delete a few BookEditions
     * const { count } = await prisma.bookEdition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookEditionDeleteManyArgs>(args?: SelectSubset<T, BookEditionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookEditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookEditionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookEditions
     * const bookEdition = await prisma.bookEdition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookEditionUpdateManyArgs>(args: SelectSubset<T, BookEditionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookEditions and returns the data updated in the database.
     * @param {BookEditionUpdateManyAndReturnArgs} args - Arguments to update many BookEditions.
     * @example
     * // Update many BookEditions
     * const bookEdition = await prisma.bookEdition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookEditions and only return the `id`
     * const bookEditionWithIdOnly = await prisma.bookEdition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookEditionUpdateManyAndReturnArgs>(args: SelectSubset<T, BookEditionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookEdition.
     * @param {BookEditionUpsertArgs} args - Arguments to update or create a BookEdition.
     * @example
     * // Update or create a BookEdition
     * const bookEdition = await prisma.bookEdition.upsert({
     *   create: {
     *     // ... data to create a BookEdition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookEdition we want to update
     *   }
     * })
     */
    upsert<T extends BookEditionUpsertArgs>(args: SelectSubset<T, BookEditionUpsertArgs<ExtArgs>>): Prisma__BookEditionClient<$Result.GetResult<Prisma.$BookEditionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookEditions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookEditionCountArgs} args - Arguments to filter BookEditions to count.
     * @example
     * // Count the number of BookEditions
     * const count = await prisma.bookEdition.count({
     *   where: {
     *     // ... the filter for the BookEditions we want to count
     *   }
     * })
    **/
    count<T extends BookEditionCountArgs>(
      args?: Subset<T, BookEditionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookEditionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookEdition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookEditionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookEditionAggregateArgs>(args: Subset<T, BookEditionAggregateArgs>): Prisma.PrismaPromise<GetBookEditionAggregateType<T>>

    /**
     * Group by BookEdition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookEditionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookEditionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookEditionGroupByArgs['orderBy'] }
        : { orderBy?: BookEditionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookEditionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookEditionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookEdition model
   */
  readonly fields: BookEditionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookEdition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookEditionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends ConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConnectionDefaultArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookEdition model
   */
  interface BookEditionFieldRefs {
    readonly id: FieldRef<"BookEdition", 'String'>
    readonly connectionId: FieldRef<"BookEdition", 'String'>
    readonly rangeFrom: FieldRef<"BookEdition", 'DateTime'>
    readonly rangeTo: FieldRef<"BookEdition", 'DateTime'>
    readonly status: FieldRef<"BookEdition", 'BookStatus'>
    readonly editionType: FieldRef<"BookEdition", 'BookEditionType'>
    readonly chapterData: FieldRef<"BookEdition", 'Json'>
    readonly pdfUrl: FieldRef<"BookEdition", 'String'>
    readonly createdAt: FieldRef<"BookEdition", 'DateTime'>
    readonly updatedAt: FieldRef<"BookEdition", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BookEdition findUnique
   */
  export type BookEditionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    /**
     * Filter, which BookEdition to fetch.
     */
    where: BookEditionWhereUniqueInput
  }

  /**
   * BookEdition findUniqueOrThrow
   */
  export type BookEditionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    /**
     * Filter, which BookEdition to fetch.
     */
    where: BookEditionWhereUniqueInput
  }

  /**
   * BookEdition findFirst
   */
  export type BookEditionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    /**
     * Filter, which BookEdition to fetch.
     */
    where?: BookEditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookEditions to fetch.
     */
    orderBy?: BookEditionOrderByWithRelationInput | BookEditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookEditions.
     */
    cursor?: BookEditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookEditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookEditions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookEditions.
     */
    distinct?: BookEditionScalarFieldEnum | BookEditionScalarFieldEnum[]
  }

  /**
   * BookEdition findFirstOrThrow
   */
  export type BookEditionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    /**
     * Filter, which BookEdition to fetch.
     */
    where?: BookEditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookEditions to fetch.
     */
    orderBy?: BookEditionOrderByWithRelationInput | BookEditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookEditions.
     */
    cursor?: BookEditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookEditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookEditions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookEditions.
     */
    distinct?: BookEditionScalarFieldEnum | BookEditionScalarFieldEnum[]
  }

  /**
   * BookEdition findMany
   */
  export type BookEditionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    /**
     * Filter, which BookEditions to fetch.
     */
    where?: BookEditionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookEditions to fetch.
     */
    orderBy?: BookEditionOrderByWithRelationInput | BookEditionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookEditions.
     */
    cursor?: BookEditionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookEditions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookEditions.
     */
    skip?: number
    distinct?: BookEditionScalarFieldEnum | BookEditionScalarFieldEnum[]
  }

  /**
   * BookEdition create
   */
  export type BookEditionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    /**
     * The data needed to create a BookEdition.
     */
    data: XOR<BookEditionCreateInput, BookEditionUncheckedCreateInput>
  }

  /**
   * BookEdition createMany
   */
  export type BookEditionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookEditions.
     */
    data: BookEditionCreateManyInput | BookEditionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookEdition createManyAndReturn
   */
  export type BookEditionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * The data used to create many BookEditions.
     */
    data: BookEditionCreateManyInput | BookEditionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookEdition update
   */
  export type BookEditionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    /**
     * The data needed to update a BookEdition.
     */
    data: XOR<BookEditionUpdateInput, BookEditionUncheckedUpdateInput>
    /**
     * Choose, which BookEdition to update.
     */
    where: BookEditionWhereUniqueInput
  }

  /**
   * BookEdition updateMany
   */
  export type BookEditionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookEditions.
     */
    data: XOR<BookEditionUpdateManyMutationInput, BookEditionUncheckedUpdateManyInput>
    /**
     * Filter which BookEditions to update
     */
    where?: BookEditionWhereInput
    /**
     * Limit how many BookEditions to update.
     */
    limit?: number
  }

  /**
   * BookEdition updateManyAndReturn
   */
  export type BookEditionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * The data used to update BookEditions.
     */
    data: XOR<BookEditionUpdateManyMutationInput, BookEditionUncheckedUpdateManyInput>
    /**
     * Filter which BookEditions to update
     */
    where?: BookEditionWhereInput
    /**
     * Limit how many BookEditions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookEdition upsert
   */
  export type BookEditionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    /**
     * The filter to search for the BookEdition to update in case it exists.
     */
    where: BookEditionWhereUniqueInput
    /**
     * In case the BookEdition found by the `where` argument doesn't exist, create a new BookEdition with this data.
     */
    create: XOR<BookEditionCreateInput, BookEditionUncheckedCreateInput>
    /**
     * In case the BookEdition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookEditionUpdateInput, BookEditionUncheckedUpdateInput>
  }

  /**
   * BookEdition delete
   */
  export type BookEditionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
    /**
     * Filter which BookEdition to delete.
     */
    where: BookEditionWhereUniqueInput
  }

  /**
   * BookEdition deleteMany
   */
  export type BookEditionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookEditions to delete
     */
    where?: BookEditionWhereInput
    /**
     * Limit how many BookEditions to delete.
     */
    limit?: number
  }

  /**
   * BookEdition without action
   */
  export type BookEditionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookEdition
     */
    select?: BookEditionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookEdition
     */
    omit?: BookEditionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookEditionInclude<ExtArgs> | null
  }


  /**
   * Model CuratedQuestion
   */

  export type AggregateCuratedQuestion = {
    _count: CuratedQuestionCountAggregateOutputType | null
    _avg: CuratedQuestionAvgAggregateOutputType | null
    _sum: CuratedQuestionSumAggregateOutputType | null
    _min: CuratedQuestionMinAggregateOutputType | null
    _max: CuratedQuestionMaxAggregateOutputType | null
  }

  export type CuratedQuestionAvgAggregateOutputType = {
    depth: number | null
  }

  export type CuratedQuestionSumAggregateOutputType = {
    depth: number | null
  }

  export type CuratedQuestionMinAggregateOutputType = {
    id: string | null
    body: string | null
    depth: number | null
    chapterTag: string | null
    personTag: string | null
    eraTag: string | null
    language: string | null
  }

  export type CuratedQuestionMaxAggregateOutputType = {
    id: string | null
    body: string | null
    depth: number | null
    chapterTag: string | null
    personTag: string | null
    eraTag: string | null
    language: string | null
  }

  export type CuratedQuestionCountAggregateOutputType = {
    id: number
    body: number
    depth: number
    chapterTag: number
    personTag: number
    eraTag: number
    language: number
    _all: number
  }


  export type CuratedQuestionAvgAggregateInputType = {
    depth?: true
  }

  export type CuratedQuestionSumAggregateInputType = {
    depth?: true
  }

  export type CuratedQuestionMinAggregateInputType = {
    id?: true
    body?: true
    depth?: true
    chapterTag?: true
    personTag?: true
    eraTag?: true
    language?: true
  }

  export type CuratedQuestionMaxAggregateInputType = {
    id?: true
    body?: true
    depth?: true
    chapterTag?: true
    personTag?: true
    eraTag?: true
    language?: true
  }

  export type CuratedQuestionCountAggregateInputType = {
    id?: true
    body?: true
    depth?: true
    chapterTag?: true
    personTag?: true
    eraTag?: true
    language?: true
    _all?: true
  }

  export type CuratedQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CuratedQuestion to aggregate.
     */
    where?: CuratedQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CuratedQuestions to fetch.
     */
    orderBy?: CuratedQuestionOrderByWithRelationInput | CuratedQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CuratedQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CuratedQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CuratedQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CuratedQuestions
    **/
    _count?: true | CuratedQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CuratedQuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CuratedQuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CuratedQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CuratedQuestionMaxAggregateInputType
  }

  export type GetCuratedQuestionAggregateType<T extends CuratedQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateCuratedQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCuratedQuestion[P]>
      : GetScalarType<T[P], AggregateCuratedQuestion[P]>
  }




  export type CuratedQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CuratedQuestionWhereInput
    orderBy?: CuratedQuestionOrderByWithAggregationInput | CuratedQuestionOrderByWithAggregationInput[]
    by: CuratedQuestionScalarFieldEnum[] | CuratedQuestionScalarFieldEnum
    having?: CuratedQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CuratedQuestionCountAggregateInputType | true
    _avg?: CuratedQuestionAvgAggregateInputType
    _sum?: CuratedQuestionSumAggregateInputType
    _min?: CuratedQuestionMinAggregateInputType
    _max?: CuratedQuestionMaxAggregateInputType
  }

  export type CuratedQuestionGroupByOutputType = {
    id: string
    body: string
    depth: number
    chapterTag: string
    personTag: string | null
    eraTag: string | null
    language: string
    _count: CuratedQuestionCountAggregateOutputType | null
    _avg: CuratedQuestionAvgAggregateOutputType | null
    _sum: CuratedQuestionSumAggregateOutputType | null
    _min: CuratedQuestionMinAggregateOutputType | null
    _max: CuratedQuestionMaxAggregateOutputType | null
  }

  type GetCuratedQuestionGroupByPayload<T extends CuratedQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CuratedQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CuratedQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CuratedQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], CuratedQuestionGroupByOutputType[P]>
        }
      >
    >


  export type CuratedQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    depth?: boolean
    chapterTag?: boolean
    personTag?: boolean
    eraTag?: boolean
    language?: boolean
  }, ExtArgs["result"]["curatedQuestion"]>

  export type CuratedQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    depth?: boolean
    chapterTag?: boolean
    personTag?: boolean
    eraTag?: boolean
    language?: boolean
  }, ExtArgs["result"]["curatedQuestion"]>

  export type CuratedQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    body?: boolean
    depth?: boolean
    chapterTag?: boolean
    personTag?: boolean
    eraTag?: boolean
    language?: boolean
  }, ExtArgs["result"]["curatedQuestion"]>

  export type CuratedQuestionSelectScalar = {
    id?: boolean
    body?: boolean
    depth?: boolean
    chapterTag?: boolean
    personTag?: boolean
    eraTag?: boolean
    language?: boolean
  }

  export type CuratedQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "body" | "depth" | "chapterTag" | "personTag" | "eraTag" | "language", ExtArgs["result"]["curatedQuestion"]>

  export type $CuratedQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CuratedQuestion"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      body: string
      depth: number
      chapterTag: string
      personTag: string | null
      eraTag: string | null
      language: string
    }, ExtArgs["result"]["curatedQuestion"]>
    composites: {}
  }

  type CuratedQuestionGetPayload<S extends boolean | null | undefined | CuratedQuestionDefaultArgs> = $Result.GetResult<Prisma.$CuratedQuestionPayload, S>

  type CuratedQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CuratedQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CuratedQuestionCountAggregateInputType | true
    }

  export interface CuratedQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CuratedQuestion'], meta: { name: 'CuratedQuestion' } }
    /**
     * Find zero or one CuratedQuestion that matches the filter.
     * @param {CuratedQuestionFindUniqueArgs} args - Arguments to find a CuratedQuestion
     * @example
     * // Get one CuratedQuestion
     * const curatedQuestion = await prisma.curatedQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CuratedQuestionFindUniqueArgs>(args: SelectSubset<T, CuratedQuestionFindUniqueArgs<ExtArgs>>): Prisma__CuratedQuestionClient<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CuratedQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CuratedQuestionFindUniqueOrThrowArgs} args - Arguments to find a CuratedQuestion
     * @example
     * // Get one CuratedQuestion
     * const curatedQuestion = await prisma.curatedQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CuratedQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, CuratedQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CuratedQuestionClient<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CuratedQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuratedQuestionFindFirstArgs} args - Arguments to find a CuratedQuestion
     * @example
     * // Get one CuratedQuestion
     * const curatedQuestion = await prisma.curatedQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CuratedQuestionFindFirstArgs>(args?: SelectSubset<T, CuratedQuestionFindFirstArgs<ExtArgs>>): Prisma__CuratedQuestionClient<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CuratedQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuratedQuestionFindFirstOrThrowArgs} args - Arguments to find a CuratedQuestion
     * @example
     * // Get one CuratedQuestion
     * const curatedQuestion = await prisma.curatedQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CuratedQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, CuratedQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CuratedQuestionClient<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CuratedQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuratedQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CuratedQuestions
     * const curatedQuestions = await prisma.curatedQuestion.findMany()
     * 
     * // Get first 10 CuratedQuestions
     * const curatedQuestions = await prisma.curatedQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const curatedQuestionWithIdOnly = await prisma.curatedQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CuratedQuestionFindManyArgs>(args?: SelectSubset<T, CuratedQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CuratedQuestion.
     * @param {CuratedQuestionCreateArgs} args - Arguments to create a CuratedQuestion.
     * @example
     * // Create one CuratedQuestion
     * const CuratedQuestion = await prisma.curatedQuestion.create({
     *   data: {
     *     // ... data to create a CuratedQuestion
     *   }
     * })
     * 
     */
    create<T extends CuratedQuestionCreateArgs>(args: SelectSubset<T, CuratedQuestionCreateArgs<ExtArgs>>): Prisma__CuratedQuestionClient<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CuratedQuestions.
     * @param {CuratedQuestionCreateManyArgs} args - Arguments to create many CuratedQuestions.
     * @example
     * // Create many CuratedQuestions
     * const curatedQuestion = await prisma.curatedQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CuratedQuestionCreateManyArgs>(args?: SelectSubset<T, CuratedQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CuratedQuestions and returns the data saved in the database.
     * @param {CuratedQuestionCreateManyAndReturnArgs} args - Arguments to create many CuratedQuestions.
     * @example
     * // Create many CuratedQuestions
     * const curatedQuestion = await prisma.curatedQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CuratedQuestions and only return the `id`
     * const curatedQuestionWithIdOnly = await prisma.curatedQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CuratedQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, CuratedQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CuratedQuestion.
     * @param {CuratedQuestionDeleteArgs} args - Arguments to delete one CuratedQuestion.
     * @example
     * // Delete one CuratedQuestion
     * const CuratedQuestion = await prisma.curatedQuestion.delete({
     *   where: {
     *     // ... filter to delete one CuratedQuestion
     *   }
     * })
     * 
     */
    delete<T extends CuratedQuestionDeleteArgs>(args: SelectSubset<T, CuratedQuestionDeleteArgs<ExtArgs>>): Prisma__CuratedQuestionClient<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CuratedQuestion.
     * @param {CuratedQuestionUpdateArgs} args - Arguments to update one CuratedQuestion.
     * @example
     * // Update one CuratedQuestion
     * const curatedQuestion = await prisma.curatedQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CuratedQuestionUpdateArgs>(args: SelectSubset<T, CuratedQuestionUpdateArgs<ExtArgs>>): Prisma__CuratedQuestionClient<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CuratedQuestions.
     * @param {CuratedQuestionDeleteManyArgs} args - Arguments to filter CuratedQuestions to delete.
     * @example
     * // Delete a few CuratedQuestions
     * const { count } = await prisma.curatedQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CuratedQuestionDeleteManyArgs>(args?: SelectSubset<T, CuratedQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CuratedQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuratedQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CuratedQuestions
     * const curatedQuestion = await prisma.curatedQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CuratedQuestionUpdateManyArgs>(args: SelectSubset<T, CuratedQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CuratedQuestions and returns the data updated in the database.
     * @param {CuratedQuestionUpdateManyAndReturnArgs} args - Arguments to update many CuratedQuestions.
     * @example
     * // Update many CuratedQuestions
     * const curatedQuestion = await prisma.curatedQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CuratedQuestions and only return the `id`
     * const curatedQuestionWithIdOnly = await prisma.curatedQuestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CuratedQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, CuratedQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CuratedQuestion.
     * @param {CuratedQuestionUpsertArgs} args - Arguments to update or create a CuratedQuestion.
     * @example
     * // Update or create a CuratedQuestion
     * const curatedQuestion = await prisma.curatedQuestion.upsert({
     *   create: {
     *     // ... data to create a CuratedQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CuratedQuestion we want to update
     *   }
     * })
     */
    upsert<T extends CuratedQuestionUpsertArgs>(args: SelectSubset<T, CuratedQuestionUpsertArgs<ExtArgs>>): Prisma__CuratedQuestionClient<$Result.GetResult<Prisma.$CuratedQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CuratedQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuratedQuestionCountArgs} args - Arguments to filter CuratedQuestions to count.
     * @example
     * // Count the number of CuratedQuestions
     * const count = await prisma.curatedQuestion.count({
     *   where: {
     *     // ... the filter for the CuratedQuestions we want to count
     *   }
     * })
    **/
    count<T extends CuratedQuestionCountArgs>(
      args?: Subset<T, CuratedQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CuratedQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CuratedQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuratedQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CuratedQuestionAggregateArgs>(args: Subset<T, CuratedQuestionAggregateArgs>): Prisma.PrismaPromise<GetCuratedQuestionAggregateType<T>>

    /**
     * Group by CuratedQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuratedQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CuratedQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CuratedQuestionGroupByArgs['orderBy'] }
        : { orderBy?: CuratedQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CuratedQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCuratedQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CuratedQuestion model
   */
  readonly fields: CuratedQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CuratedQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CuratedQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CuratedQuestion model
   */
  interface CuratedQuestionFieldRefs {
    readonly id: FieldRef<"CuratedQuestion", 'String'>
    readonly body: FieldRef<"CuratedQuestion", 'String'>
    readonly depth: FieldRef<"CuratedQuestion", 'Int'>
    readonly chapterTag: FieldRef<"CuratedQuestion", 'String'>
    readonly personTag: FieldRef<"CuratedQuestion", 'String'>
    readonly eraTag: FieldRef<"CuratedQuestion", 'String'>
    readonly language: FieldRef<"CuratedQuestion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CuratedQuestion findUnique
   */
  export type CuratedQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * Filter, which CuratedQuestion to fetch.
     */
    where: CuratedQuestionWhereUniqueInput
  }

  /**
   * CuratedQuestion findUniqueOrThrow
   */
  export type CuratedQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * Filter, which CuratedQuestion to fetch.
     */
    where: CuratedQuestionWhereUniqueInput
  }

  /**
   * CuratedQuestion findFirst
   */
  export type CuratedQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * Filter, which CuratedQuestion to fetch.
     */
    where?: CuratedQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CuratedQuestions to fetch.
     */
    orderBy?: CuratedQuestionOrderByWithRelationInput | CuratedQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CuratedQuestions.
     */
    cursor?: CuratedQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CuratedQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CuratedQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CuratedQuestions.
     */
    distinct?: CuratedQuestionScalarFieldEnum | CuratedQuestionScalarFieldEnum[]
  }

  /**
   * CuratedQuestion findFirstOrThrow
   */
  export type CuratedQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * Filter, which CuratedQuestion to fetch.
     */
    where?: CuratedQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CuratedQuestions to fetch.
     */
    orderBy?: CuratedQuestionOrderByWithRelationInput | CuratedQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CuratedQuestions.
     */
    cursor?: CuratedQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CuratedQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CuratedQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CuratedQuestions.
     */
    distinct?: CuratedQuestionScalarFieldEnum | CuratedQuestionScalarFieldEnum[]
  }

  /**
   * CuratedQuestion findMany
   */
  export type CuratedQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * Filter, which CuratedQuestions to fetch.
     */
    where?: CuratedQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CuratedQuestions to fetch.
     */
    orderBy?: CuratedQuestionOrderByWithRelationInput | CuratedQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CuratedQuestions.
     */
    cursor?: CuratedQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CuratedQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CuratedQuestions.
     */
    skip?: number
    distinct?: CuratedQuestionScalarFieldEnum | CuratedQuestionScalarFieldEnum[]
  }

  /**
   * CuratedQuestion create
   */
  export type CuratedQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * The data needed to create a CuratedQuestion.
     */
    data: XOR<CuratedQuestionCreateInput, CuratedQuestionUncheckedCreateInput>
  }

  /**
   * CuratedQuestion createMany
   */
  export type CuratedQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CuratedQuestions.
     */
    data: CuratedQuestionCreateManyInput | CuratedQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CuratedQuestion createManyAndReturn
   */
  export type CuratedQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many CuratedQuestions.
     */
    data: CuratedQuestionCreateManyInput | CuratedQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CuratedQuestion update
   */
  export type CuratedQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * The data needed to update a CuratedQuestion.
     */
    data: XOR<CuratedQuestionUpdateInput, CuratedQuestionUncheckedUpdateInput>
    /**
     * Choose, which CuratedQuestion to update.
     */
    where: CuratedQuestionWhereUniqueInput
  }

  /**
   * CuratedQuestion updateMany
   */
  export type CuratedQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CuratedQuestions.
     */
    data: XOR<CuratedQuestionUpdateManyMutationInput, CuratedQuestionUncheckedUpdateManyInput>
    /**
     * Filter which CuratedQuestions to update
     */
    where?: CuratedQuestionWhereInput
    /**
     * Limit how many CuratedQuestions to update.
     */
    limit?: number
  }

  /**
   * CuratedQuestion updateManyAndReturn
   */
  export type CuratedQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * The data used to update CuratedQuestions.
     */
    data: XOR<CuratedQuestionUpdateManyMutationInput, CuratedQuestionUncheckedUpdateManyInput>
    /**
     * Filter which CuratedQuestions to update
     */
    where?: CuratedQuestionWhereInput
    /**
     * Limit how many CuratedQuestions to update.
     */
    limit?: number
  }

  /**
   * CuratedQuestion upsert
   */
  export type CuratedQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * The filter to search for the CuratedQuestion to update in case it exists.
     */
    where: CuratedQuestionWhereUniqueInput
    /**
     * In case the CuratedQuestion found by the `where` argument doesn't exist, create a new CuratedQuestion with this data.
     */
    create: XOR<CuratedQuestionCreateInput, CuratedQuestionUncheckedCreateInput>
    /**
     * In case the CuratedQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CuratedQuestionUpdateInput, CuratedQuestionUncheckedUpdateInput>
  }

  /**
   * CuratedQuestion delete
   */
  export type CuratedQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
    /**
     * Filter which CuratedQuestion to delete.
     */
    where: CuratedQuestionWhereUniqueInput
  }

  /**
   * CuratedQuestion deleteMany
   */
  export type CuratedQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CuratedQuestions to delete
     */
    where?: CuratedQuestionWhereInput
    /**
     * Limit how many CuratedQuestions to delete.
     */
    limit?: number
  }

  /**
   * CuratedQuestion without action
   */
  export type CuratedQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuratedQuestion
     */
    select?: CuratedQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CuratedQuestion
     */
    omit?: CuratedQuestionOmit<ExtArgs> | null
  }


  /**
   * Model AccessLog
   */

  export type AggregateAccessLog = {
    _count: AccessLogCountAggregateOutputType | null
    _min: AccessLogMinAggregateOutputType | null
    _max: AccessLogMaxAggregateOutputType | null
  }

  export type AccessLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    name: string | null
    ipAddress: string | null
    userAgent: string | null
    path: string | null
    referrer: string | null
    createdAt: Date | null
  }

  export type AccessLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    name: string | null
    ipAddress: string | null
    userAgent: string | null
    path: string | null
    referrer: string | null
    createdAt: Date | null
  }

  export type AccessLogCountAggregateOutputType = {
    id: number
    userId: number
    email: number
    name: number
    ipAddress: number
    userAgent: number
    path: number
    referrer: number
    createdAt: number
    _all: number
  }


  export type AccessLogMinAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    name?: true
    ipAddress?: true
    userAgent?: true
    path?: true
    referrer?: true
    createdAt?: true
  }

  export type AccessLogMaxAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    name?: true
    ipAddress?: true
    userAgent?: true
    path?: true
    referrer?: true
    createdAt?: true
  }

  export type AccessLogCountAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    name?: true
    ipAddress?: true
    userAgent?: true
    path?: true
    referrer?: true
    createdAt?: true
    _all?: true
  }

  export type AccessLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessLog to aggregate.
     */
    where?: AccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLogs to fetch.
     */
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccessLogs
    **/
    _count?: true | AccessLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccessLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccessLogMaxAggregateInputType
  }

  export type GetAccessLogAggregateType<T extends AccessLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAccessLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccessLog[P]>
      : GetScalarType<T[P], AggregateAccessLog[P]>
  }




  export type AccessLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccessLogWhereInput
    orderBy?: AccessLogOrderByWithAggregationInput | AccessLogOrderByWithAggregationInput[]
    by: AccessLogScalarFieldEnum[] | AccessLogScalarFieldEnum
    having?: AccessLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccessLogCountAggregateInputType | true
    _min?: AccessLogMinAggregateInputType
    _max?: AccessLogMaxAggregateInputType
  }

  export type AccessLogGroupByOutputType = {
    id: string
    userId: string | null
    email: string | null
    name: string | null
    ipAddress: string | null
    userAgent: string | null
    path: string | null
    referrer: string | null
    createdAt: Date
    _count: AccessLogCountAggregateOutputType | null
    _min: AccessLogMinAggregateOutputType | null
    _max: AccessLogMaxAggregateOutputType | null
  }

  type GetAccessLogGroupByPayload<T extends AccessLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccessLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccessLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccessLogGroupByOutputType[P]>
            : GetScalarType<T[P], AccessLogGroupByOutputType[P]>
        }
      >
    >


  export type AccessLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    name?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    path?: boolean
    referrer?: boolean
    createdAt?: boolean
    user?: boolean | AccessLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["accessLog"]>

  export type AccessLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    name?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    path?: boolean
    referrer?: boolean
    createdAt?: boolean
    user?: boolean | AccessLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["accessLog"]>

  export type AccessLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    name?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    path?: boolean
    referrer?: boolean
    createdAt?: boolean
    user?: boolean | AccessLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["accessLog"]>

  export type AccessLogSelectScalar = {
    id?: boolean
    userId?: boolean
    email?: boolean
    name?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    path?: boolean
    referrer?: boolean
    createdAt?: boolean
  }

  export type AccessLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "email" | "name" | "ipAddress" | "userAgent" | "path" | "referrer" | "createdAt", ExtArgs["result"]["accessLog"]>
  export type AccessLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AccessLog$userArgs<ExtArgs>
  }
  export type AccessLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AccessLog$userArgs<ExtArgs>
  }
  export type AccessLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AccessLog$userArgs<ExtArgs>
  }

  export type $AccessLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AccessLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      email: string | null
      name: string | null
      ipAddress: string | null
      userAgent: string | null
      path: string | null
      referrer: string | null
      createdAt: Date
    }, ExtArgs["result"]["accessLog"]>
    composites: {}
  }

  type AccessLogGetPayload<S extends boolean | null | undefined | AccessLogDefaultArgs> = $Result.GetResult<Prisma.$AccessLogPayload, S>

  type AccessLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccessLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccessLogCountAggregateInputType | true
    }

  export interface AccessLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AccessLog'], meta: { name: 'AccessLog' } }
    /**
     * Find zero or one AccessLog that matches the filter.
     * @param {AccessLogFindUniqueArgs} args - Arguments to find a AccessLog
     * @example
     * // Get one AccessLog
     * const accessLog = await prisma.accessLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccessLogFindUniqueArgs>(args: SelectSubset<T, AccessLogFindUniqueArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AccessLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccessLogFindUniqueOrThrowArgs} args - Arguments to find a AccessLog
     * @example
     * // Get one AccessLog
     * const accessLog = await prisma.accessLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccessLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AccessLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogFindFirstArgs} args - Arguments to find a AccessLog
     * @example
     * // Get one AccessLog
     * const accessLog = await prisma.accessLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccessLogFindFirstArgs>(args?: SelectSubset<T, AccessLogFindFirstArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AccessLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogFindFirstOrThrowArgs} args - Arguments to find a AccessLog
     * @example
     * // Get one AccessLog
     * const accessLog = await prisma.accessLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccessLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AccessLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AccessLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccessLogs
     * const accessLogs = await prisma.accessLog.findMany()
     * 
     * // Get first 10 AccessLogs
     * const accessLogs = await prisma.accessLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accessLogWithIdOnly = await prisma.accessLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccessLogFindManyArgs>(args?: SelectSubset<T, AccessLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AccessLog.
     * @param {AccessLogCreateArgs} args - Arguments to create a AccessLog.
     * @example
     * // Create one AccessLog
     * const AccessLog = await prisma.accessLog.create({
     *   data: {
     *     // ... data to create a AccessLog
     *   }
     * })
     * 
     */
    create<T extends AccessLogCreateArgs>(args: SelectSubset<T, AccessLogCreateArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AccessLogs.
     * @param {AccessLogCreateManyArgs} args - Arguments to create many AccessLogs.
     * @example
     * // Create many AccessLogs
     * const accessLog = await prisma.accessLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccessLogCreateManyArgs>(args?: SelectSubset<T, AccessLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AccessLogs and returns the data saved in the database.
     * @param {AccessLogCreateManyAndReturnArgs} args - Arguments to create many AccessLogs.
     * @example
     * // Create many AccessLogs
     * const accessLog = await prisma.accessLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AccessLogs and only return the `id`
     * const accessLogWithIdOnly = await prisma.accessLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccessLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AccessLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AccessLog.
     * @param {AccessLogDeleteArgs} args - Arguments to delete one AccessLog.
     * @example
     * // Delete one AccessLog
     * const AccessLog = await prisma.accessLog.delete({
     *   where: {
     *     // ... filter to delete one AccessLog
     *   }
     * })
     * 
     */
    delete<T extends AccessLogDeleteArgs>(args: SelectSubset<T, AccessLogDeleteArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AccessLog.
     * @param {AccessLogUpdateArgs} args - Arguments to update one AccessLog.
     * @example
     * // Update one AccessLog
     * const accessLog = await prisma.accessLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccessLogUpdateArgs>(args: SelectSubset<T, AccessLogUpdateArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AccessLogs.
     * @param {AccessLogDeleteManyArgs} args - Arguments to filter AccessLogs to delete.
     * @example
     * // Delete a few AccessLogs
     * const { count } = await prisma.accessLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccessLogDeleteManyArgs>(args?: SelectSubset<T, AccessLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccessLogs
     * const accessLog = await prisma.accessLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccessLogUpdateManyArgs>(args: SelectSubset<T, AccessLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccessLogs and returns the data updated in the database.
     * @param {AccessLogUpdateManyAndReturnArgs} args - Arguments to update many AccessLogs.
     * @example
     * // Update many AccessLogs
     * const accessLog = await prisma.accessLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AccessLogs and only return the `id`
     * const accessLogWithIdOnly = await prisma.accessLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccessLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AccessLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AccessLog.
     * @param {AccessLogUpsertArgs} args - Arguments to update or create a AccessLog.
     * @example
     * // Update or create a AccessLog
     * const accessLog = await prisma.accessLog.upsert({
     *   create: {
     *     // ... data to create a AccessLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccessLog we want to update
     *   }
     * })
     */
    upsert<T extends AccessLogUpsertArgs>(args: SelectSubset<T, AccessLogUpsertArgs<ExtArgs>>): Prisma__AccessLogClient<$Result.GetResult<Prisma.$AccessLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AccessLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogCountArgs} args - Arguments to filter AccessLogs to count.
     * @example
     * // Count the number of AccessLogs
     * const count = await prisma.accessLog.count({
     *   where: {
     *     // ... the filter for the AccessLogs we want to count
     *   }
     * })
    **/
    count<T extends AccessLogCountArgs>(
      args?: Subset<T, AccessLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccessLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccessLogAggregateArgs>(args: Subset<T, AccessLogAggregateArgs>): Prisma.PrismaPromise<GetAccessLogAggregateType<T>>

    /**
     * Group by AccessLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccessLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccessLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccessLogGroupByArgs['orderBy'] }
        : { orderBy?: AccessLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccessLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccessLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AccessLog model
   */
  readonly fields: AccessLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AccessLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccessLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AccessLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AccessLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AccessLog model
   */
  interface AccessLogFieldRefs {
    readonly id: FieldRef<"AccessLog", 'String'>
    readonly userId: FieldRef<"AccessLog", 'String'>
    readonly email: FieldRef<"AccessLog", 'String'>
    readonly name: FieldRef<"AccessLog", 'String'>
    readonly ipAddress: FieldRef<"AccessLog", 'String'>
    readonly userAgent: FieldRef<"AccessLog", 'String'>
    readonly path: FieldRef<"AccessLog", 'String'>
    readonly referrer: FieldRef<"AccessLog", 'String'>
    readonly createdAt: FieldRef<"AccessLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AccessLog findUnique
   */
  export type AccessLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLog to fetch.
     */
    where: AccessLogWhereUniqueInput
  }

  /**
   * AccessLog findUniqueOrThrow
   */
  export type AccessLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLog to fetch.
     */
    where: AccessLogWhereUniqueInput
  }

  /**
   * AccessLog findFirst
   */
  export type AccessLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLog to fetch.
     */
    where?: AccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLogs to fetch.
     */
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessLogs.
     */
    cursor?: AccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessLogs.
     */
    distinct?: AccessLogScalarFieldEnum | AccessLogScalarFieldEnum[]
  }

  /**
   * AccessLog findFirstOrThrow
   */
  export type AccessLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLog to fetch.
     */
    where?: AccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLogs to fetch.
     */
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccessLogs.
     */
    cursor?: AccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccessLogs.
     */
    distinct?: AccessLogScalarFieldEnum | AccessLogScalarFieldEnum[]
  }

  /**
   * AccessLog findMany
   */
  export type AccessLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter, which AccessLogs to fetch.
     */
    where?: AccessLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccessLogs to fetch.
     */
    orderBy?: AccessLogOrderByWithRelationInput | AccessLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccessLogs.
     */
    cursor?: AccessLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccessLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccessLogs.
     */
    skip?: number
    distinct?: AccessLogScalarFieldEnum | AccessLogScalarFieldEnum[]
  }

  /**
   * AccessLog create
   */
  export type AccessLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AccessLog.
     */
    data?: XOR<AccessLogCreateInput, AccessLogUncheckedCreateInput>
  }

  /**
   * AccessLog createMany
   */
  export type AccessLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AccessLogs.
     */
    data: AccessLogCreateManyInput | AccessLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AccessLog createManyAndReturn
   */
  export type AccessLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * The data used to create many AccessLogs.
     */
    data: AccessLogCreateManyInput | AccessLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessLog update
   */
  export type AccessLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AccessLog.
     */
    data: XOR<AccessLogUpdateInput, AccessLogUncheckedUpdateInput>
    /**
     * Choose, which AccessLog to update.
     */
    where: AccessLogWhereUniqueInput
  }

  /**
   * AccessLog updateMany
   */
  export type AccessLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AccessLogs.
     */
    data: XOR<AccessLogUpdateManyMutationInput, AccessLogUncheckedUpdateManyInput>
    /**
     * Filter which AccessLogs to update
     */
    where?: AccessLogWhereInput
    /**
     * Limit how many AccessLogs to update.
     */
    limit?: number
  }

  /**
   * AccessLog updateManyAndReturn
   */
  export type AccessLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * The data used to update AccessLogs.
     */
    data: XOR<AccessLogUpdateManyMutationInput, AccessLogUncheckedUpdateManyInput>
    /**
     * Filter which AccessLogs to update
     */
    where?: AccessLogWhereInput
    /**
     * Limit how many AccessLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AccessLog upsert
   */
  export type AccessLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AccessLog to update in case it exists.
     */
    where: AccessLogWhereUniqueInput
    /**
     * In case the AccessLog found by the `where` argument doesn't exist, create a new AccessLog with this data.
     */
    create: XOR<AccessLogCreateInput, AccessLogUncheckedCreateInput>
    /**
     * In case the AccessLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccessLogUpdateInput, AccessLogUncheckedUpdateInput>
  }

  /**
   * AccessLog delete
   */
  export type AccessLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
    /**
     * Filter which AccessLog to delete.
     */
    where: AccessLogWhereUniqueInput
  }

  /**
   * AccessLog deleteMany
   */
  export type AccessLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AccessLogs to delete
     */
    where?: AccessLogWhereInput
    /**
     * Limit how many AccessLogs to delete.
     */
    limit?: number
  }

  /**
   * AccessLog.user
   */
  export type AccessLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AccessLog without action
   */
  export type AccessLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccessLog
     */
    select?: AccessLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AccessLog
     */
    omit?: AccessLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccessLogInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    userId: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    userId?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    userId: string
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    userId?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId", ExtArgs["result"]["admin"]>
  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly userId: FieldRef<"Admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model Inquiry
   */

  export type AggregateInquiry = {
    _count: InquiryCountAggregateOutputType | null
    _min: InquiryMinAggregateOutputType | null
    _max: InquiryMaxAggregateOutputType | null
  }

  export type InquiryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    category: $Enums.InquiryCategory | null
    message: string | null
    status: $Enums.InquiryStatus | null
    ipAddress: string | null
    userAgent: string | null
    emailSent: boolean | null
    createdAt: Date | null
  }

  export type InquiryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    category: $Enums.InquiryCategory | null
    message: string | null
    status: $Enums.InquiryStatus | null
    ipAddress: string | null
    userAgent: string | null
    emailSent: boolean | null
    createdAt: Date | null
  }

  export type InquiryCountAggregateOutputType = {
    id: number
    userId: number
    email: number
    category: number
    message: number
    status: number
    ipAddress: number
    userAgent: number
    emailSent: number
    createdAt: number
    _all: number
  }


  export type InquiryMinAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    category?: true
    message?: true
    status?: true
    ipAddress?: true
    userAgent?: true
    emailSent?: true
    createdAt?: true
  }

  export type InquiryMaxAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    category?: true
    message?: true
    status?: true
    ipAddress?: true
    userAgent?: true
    emailSent?: true
    createdAt?: true
  }

  export type InquiryCountAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    category?: true
    message?: true
    status?: true
    ipAddress?: true
    userAgent?: true
    emailSent?: true
    createdAt?: true
    _all?: true
  }

  export type InquiryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquiry to aggregate.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inquiries
    **/
    _count?: true | InquiryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InquiryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InquiryMaxAggregateInputType
  }

  export type GetInquiryAggregateType<T extends InquiryAggregateArgs> = {
        [P in keyof T & keyof AggregateInquiry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInquiry[P]>
      : GetScalarType<T[P], AggregateInquiry[P]>
  }




  export type InquiryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryWhereInput
    orderBy?: InquiryOrderByWithAggregationInput | InquiryOrderByWithAggregationInput[]
    by: InquiryScalarFieldEnum[] | InquiryScalarFieldEnum
    having?: InquiryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InquiryCountAggregateInputType | true
    _min?: InquiryMinAggregateInputType
    _max?: InquiryMaxAggregateInputType
  }

  export type InquiryGroupByOutputType = {
    id: string
    userId: string | null
    email: string
    category: $Enums.InquiryCategory | null
    message: string
    status: $Enums.InquiryStatus
    ipAddress: string | null
    userAgent: string | null
    emailSent: boolean
    createdAt: Date
    _count: InquiryCountAggregateOutputType | null
    _min: InquiryMinAggregateOutputType | null
    _max: InquiryMaxAggregateOutputType | null
  }

  type GetInquiryGroupByPayload<T extends InquiryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InquiryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InquiryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InquiryGroupByOutputType[P]>
            : GetScalarType<T[P], InquiryGroupByOutputType[P]>
        }
      >
    >


  export type InquirySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    category?: boolean
    message?: boolean
    status?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    emailSent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inquiry"]>

  export type InquirySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    category?: boolean
    message?: boolean
    status?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    emailSent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inquiry"]>

  export type InquirySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    category?: boolean
    message?: boolean
    status?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    emailSent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inquiry"]>

  export type InquirySelectScalar = {
    id?: boolean
    userId?: boolean
    email?: boolean
    category?: boolean
    message?: boolean
    status?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    emailSent?: boolean
    createdAt?: boolean
  }

  export type InquiryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "email" | "category" | "message" | "status" | "ipAddress" | "userAgent" | "emailSent" | "createdAt", ExtArgs["result"]["inquiry"]>

  export type $InquiryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inquiry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      email: string
      category: $Enums.InquiryCategory | null
      message: string
      status: $Enums.InquiryStatus
      ipAddress: string | null
      userAgent: string | null
      emailSent: boolean
      createdAt: Date
    }, ExtArgs["result"]["inquiry"]>
    composites: {}
  }

  type InquiryGetPayload<S extends boolean | null | undefined | InquiryDefaultArgs> = $Result.GetResult<Prisma.$InquiryPayload, S>

  type InquiryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InquiryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InquiryCountAggregateInputType | true
    }

  export interface InquiryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inquiry'], meta: { name: 'Inquiry' } }
    /**
     * Find zero or one Inquiry that matches the filter.
     * @param {InquiryFindUniqueArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InquiryFindUniqueArgs>(args: SelectSubset<T, InquiryFindUniqueArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inquiry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InquiryFindUniqueOrThrowArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InquiryFindUniqueOrThrowArgs>(args: SelectSubset<T, InquiryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inquiry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindFirstArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InquiryFindFirstArgs>(args?: SelectSubset<T, InquiryFindFirstArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inquiry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindFirstOrThrowArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InquiryFindFirstOrThrowArgs>(args?: SelectSubset<T, InquiryFindFirstOrThrowArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inquiries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inquiries
     * const inquiries = await prisma.inquiry.findMany()
     * 
     * // Get first 10 Inquiries
     * const inquiries = await prisma.inquiry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inquiryWithIdOnly = await prisma.inquiry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InquiryFindManyArgs>(args?: SelectSubset<T, InquiryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inquiry.
     * @param {InquiryCreateArgs} args - Arguments to create a Inquiry.
     * @example
     * // Create one Inquiry
     * const Inquiry = await prisma.inquiry.create({
     *   data: {
     *     // ... data to create a Inquiry
     *   }
     * })
     * 
     */
    create<T extends InquiryCreateArgs>(args: SelectSubset<T, InquiryCreateArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inquiries.
     * @param {InquiryCreateManyArgs} args - Arguments to create many Inquiries.
     * @example
     * // Create many Inquiries
     * const inquiry = await prisma.inquiry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InquiryCreateManyArgs>(args?: SelectSubset<T, InquiryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inquiries and returns the data saved in the database.
     * @param {InquiryCreateManyAndReturnArgs} args - Arguments to create many Inquiries.
     * @example
     * // Create many Inquiries
     * const inquiry = await prisma.inquiry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inquiries and only return the `id`
     * const inquiryWithIdOnly = await prisma.inquiry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InquiryCreateManyAndReturnArgs>(args?: SelectSubset<T, InquiryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Inquiry.
     * @param {InquiryDeleteArgs} args - Arguments to delete one Inquiry.
     * @example
     * // Delete one Inquiry
     * const Inquiry = await prisma.inquiry.delete({
     *   where: {
     *     // ... filter to delete one Inquiry
     *   }
     * })
     * 
     */
    delete<T extends InquiryDeleteArgs>(args: SelectSubset<T, InquiryDeleteArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inquiry.
     * @param {InquiryUpdateArgs} args - Arguments to update one Inquiry.
     * @example
     * // Update one Inquiry
     * const inquiry = await prisma.inquiry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InquiryUpdateArgs>(args: SelectSubset<T, InquiryUpdateArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inquiries.
     * @param {InquiryDeleteManyArgs} args - Arguments to filter Inquiries to delete.
     * @example
     * // Delete a few Inquiries
     * const { count } = await prisma.inquiry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InquiryDeleteManyArgs>(args?: SelectSubset<T, InquiryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inquiries
     * const inquiry = await prisma.inquiry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InquiryUpdateManyArgs>(args: SelectSubset<T, InquiryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inquiries and returns the data updated in the database.
     * @param {InquiryUpdateManyAndReturnArgs} args - Arguments to update many Inquiries.
     * @example
     * // Update many Inquiries
     * const inquiry = await prisma.inquiry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inquiries and only return the `id`
     * const inquiryWithIdOnly = await prisma.inquiry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InquiryUpdateManyAndReturnArgs>(args: SelectSubset<T, InquiryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Inquiry.
     * @param {InquiryUpsertArgs} args - Arguments to update or create a Inquiry.
     * @example
     * // Update or create a Inquiry
     * const inquiry = await prisma.inquiry.upsert({
     *   create: {
     *     // ... data to create a Inquiry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inquiry we want to update
     *   }
     * })
     */
    upsert<T extends InquiryUpsertArgs>(args: SelectSubset<T, InquiryUpsertArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryCountArgs} args - Arguments to filter Inquiries to count.
     * @example
     * // Count the number of Inquiries
     * const count = await prisma.inquiry.count({
     *   where: {
     *     // ... the filter for the Inquiries we want to count
     *   }
     * })
    **/
    count<T extends InquiryCountArgs>(
      args?: Subset<T, InquiryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InquiryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InquiryAggregateArgs>(args: Subset<T, InquiryAggregateArgs>): Prisma.PrismaPromise<GetInquiryAggregateType<T>>

    /**
     * Group by Inquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InquiryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InquiryGroupByArgs['orderBy'] }
        : { orderBy?: InquiryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InquiryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInquiryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inquiry model
   */
  readonly fields: InquiryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inquiry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InquiryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inquiry model
   */
  interface InquiryFieldRefs {
    readonly id: FieldRef<"Inquiry", 'String'>
    readonly userId: FieldRef<"Inquiry", 'String'>
    readonly email: FieldRef<"Inquiry", 'String'>
    readonly category: FieldRef<"Inquiry", 'InquiryCategory'>
    readonly message: FieldRef<"Inquiry", 'String'>
    readonly status: FieldRef<"Inquiry", 'InquiryStatus'>
    readonly ipAddress: FieldRef<"Inquiry", 'String'>
    readonly userAgent: FieldRef<"Inquiry", 'String'>
    readonly emailSent: FieldRef<"Inquiry", 'Boolean'>
    readonly createdAt: FieldRef<"Inquiry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Inquiry findUnique
   */
  export type InquiryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry findUniqueOrThrow
   */
  export type InquiryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry findFirst
   */
  export type InquiryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquiries.
     */
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry findFirstOrThrow
   */
  export type InquiryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquiries.
     */
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry findMany
   */
  export type InquiryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Filter, which Inquiries to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry create
   */
  export type InquiryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * The data needed to create a Inquiry.
     */
    data: XOR<InquiryCreateInput, InquiryUncheckedCreateInput>
  }

  /**
   * Inquiry createMany
   */
  export type InquiryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inquiries.
     */
    data: InquiryCreateManyInput | InquiryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inquiry createManyAndReturn
   */
  export type InquiryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * The data used to create many Inquiries.
     */
    data: InquiryCreateManyInput | InquiryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inquiry update
   */
  export type InquiryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * The data needed to update a Inquiry.
     */
    data: XOR<InquiryUpdateInput, InquiryUncheckedUpdateInput>
    /**
     * Choose, which Inquiry to update.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry updateMany
   */
  export type InquiryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inquiries.
     */
    data: XOR<InquiryUpdateManyMutationInput, InquiryUncheckedUpdateManyInput>
    /**
     * Filter which Inquiries to update
     */
    where?: InquiryWhereInput
    /**
     * Limit how many Inquiries to update.
     */
    limit?: number
  }

  /**
   * Inquiry updateManyAndReturn
   */
  export type InquiryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * The data used to update Inquiries.
     */
    data: XOR<InquiryUpdateManyMutationInput, InquiryUncheckedUpdateManyInput>
    /**
     * Filter which Inquiries to update
     */
    where?: InquiryWhereInput
    /**
     * Limit how many Inquiries to update.
     */
    limit?: number
  }

  /**
   * Inquiry upsert
   */
  export type InquiryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * The filter to search for the Inquiry to update in case it exists.
     */
    where: InquiryWhereUniqueInput
    /**
     * In case the Inquiry found by the `where` argument doesn't exist, create a new Inquiry with this data.
     */
    create: XOR<InquiryCreateInput, InquiryUncheckedCreateInput>
    /**
     * In case the Inquiry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InquiryUpdateInput, InquiryUncheckedUpdateInput>
  }

  /**
   * Inquiry delete
   */
  export type InquiryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Filter which Inquiry to delete.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry deleteMany
   */
  export type InquiryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquiries to delete
     */
    where?: InquiryWhereInput
    /**
     * Limit how many Inquiries to delete.
     */
    limit?: number
  }

  /**
   * Inquiry without action
   */
  export type InquiryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
  }


  /**
   * Model AdminAudit
   */

  export type AggregateAdminAudit = {
    _count: AdminAuditCountAggregateOutputType | null
    _min: AdminAuditMinAggregateOutputType | null
    _max: AdminAuditMaxAggregateOutputType | null
  }

  export type AdminAuditMinAggregateOutputType = {
    id: string | null
    adminId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type AdminAuditMaxAggregateOutputType = {
    id: string | null
    adminId: string | null
    action: string | null
    createdAt: Date | null
  }

  export type AdminAuditCountAggregateOutputType = {
    id: number
    adminId: number
    action: number
    targetIds: number
    createdAt: number
    _all: number
  }


  export type AdminAuditMinAggregateInputType = {
    id?: true
    adminId?: true
    action?: true
    createdAt?: true
  }

  export type AdminAuditMaxAggregateInputType = {
    id?: true
    adminId?: true
    action?: true
    createdAt?: true
  }

  export type AdminAuditCountAggregateInputType = {
    id?: true
    adminId?: true
    action?: true
    targetIds?: true
    createdAt?: true
    _all?: true
  }

  export type AdminAuditAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminAudit to aggregate.
     */
    where?: AdminAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAudits to fetch.
     */
    orderBy?: AdminAuditOrderByWithRelationInput | AdminAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminAudits
    **/
    _count?: true | AdminAuditCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminAuditMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminAuditMaxAggregateInputType
  }

  export type GetAdminAuditAggregateType<T extends AdminAuditAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminAudit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminAudit[P]>
      : GetScalarType<T[P], AggregateAdminAudit[P]>
  }




  export type AdminAuditGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminAuditWhereInput
    orderBy?: AdminAuditOrderByWithAggregationInput | AdminAuditOrderByWithAggregationInput[]
    by: AdminAuditScalarFieldEnum[] | AdminAuditScalarFieldEnum
    having?: AdminAuditScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminAuditCountAggregateInputType | true
    _min?: AdminAuditMinAggregateInputType
    _max?: AdminAuditMaxAggregateInputType
  }

  export type AdminAuditGroupByOutputType = {
    id: string
    adminId: string
    action: string
    targetIds: string[]
    createdAt: Date
    _count: AdminAuditCountAggregateOutputType | null
    _min: AdminAuditMinAggregateOutputType | null
    _max: AdminAuditMaxAggregateOutputType | null
  }

  type GetAdminAuditGroupByPayload<T extends AdminAuditGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminAuditGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminAuditGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminAuditGroupByOutputType[P]>
            : GetScalarType<T[P], AdminAuditGroupByOutputType[P]>
        }
      >
    >


  export type AdminAuditSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    action?: boolean
    targetIds?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminAudit"]>

  export type AdminAuditSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    action?: boolean
    targetIds?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminAudit"]>

  export type AdminAuditSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    action?: boolean
    targetIds?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminAudit"]>

  export type AdminAuditSelectScalar = {
    id?: boolean
    adminId?: boolean
    action?: boolean
    targetIds?: boolean
    createdAt?: boolean
  }

  export type AdminAuditOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminId" | "action" | "targetIds" | "createdAt", ExtArgs["result"]["adminAudit"]>

  export type $AdminAuditPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminAudit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminId: string
      action: string
      targetIds: string[]
      createdAt: Date
    }, ExtArgs["result"]["adminAudit"]>
    composites: {}
  }

  type AdminAuditGetPayload<S extends boolean | null | undefined | AdminAuditDefaultArgs> = $Result.GetResult<Prisma.$AdminAuditPayload, S>

  type AdminAuditCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminAuditFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminAuditCountAggregateInputType | true
    }

  export interface AdminAuditDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminAudit'], meta: { name: 'AdminAudit' } }
    /**
     * Find zero or one AdminAudit that matches the filter.
     * @param {AdminAuditFindUniqueArgs} args - Arguments to find a AdminAudit
     * @example
     * // Get one AdminAudit
     * const adminAudit = await prisma.adminAudit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminAuditFindUniqueArgs>(args: SelectSubset<T, AdminAuditFindUniqueArgs<ExtArgs>>): Prisma__AdminAuditClient<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminAudit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminAuditFindUniqueOrThrowArgs} args - Arguments to find a AdminAudit
     * @example
     * // Get one AdminAudit
     * const adminAudit = await prisma.adminAudit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminAuditFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminAuditFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminAuditClient<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminAudit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditFindFirstArgs} args - Arguments to find a AdminAudit
     * @example
     * // Get one AdminAudit
     * const adminAudit = await prisma.adminAudit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminAuditFindFirstArgs>(args?: SelectSubset<T, AdminAuditFindFirstArgs<ExtArgs>>): Prisma__AdminAuditClient<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminAudit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditFindFirstOrThrowArgs} args - Arguments to find a AdminAudit
     * @example
     * // Get one AdminAudit
     * const adminAudit = await prisma.adminAudit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminAuditFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminAuditFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminAuditClient<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminAudits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminAudits
     * const adminAudits = await prisma.adminAudit.findMany()
     * 
     * // Get first 10 AdminAudits
     * const adminAudits = await prisma.adminAudit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminAuditWithIdOnly = await prisma.adminAudit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminAuditFindManyArgs>(args?: SelectSubset<T, AdminAuditFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminAudit.
     * @param {AdminAuditCreateArgs} args - Arguments to create a AdminAudit.
     * @example
     * // Create one AdminAudit
     * const AdminAudit = await prisma.adminAudit.create({
     *   data: {
     *     // ... data to create a AdminAudit
     *   }
     * })
     * 
     */
    create<T extends AdminAuditCreateArgs>(args: SelectSubset<T, AdminAuditCreateArgs<ExtArgs>>): Prisma__AdminAuditClient<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminAudits.
     * @param {AdminAuditCreateManyArgs} args - Arguments to create many AdminAudits.
     * @example
     * // Create many AdminAudits
     * const adminAudit = await prisma.adminAudit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminAuditCreateManyArgs>(args?: SelectSubset<T, AdminAuditCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminAudits and returns the data saved in the database.
     * @param {AdminAuditCreateManyAndReturnArgs} args - Arguments to create many AdminAudits.
     * @example
     * // Create many AdminAudits
     * const adminAudit = await prisma.adminAudit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminAudits and only return the `id`
     * const adminAuditWithIdOnly = await prisma.adminAudit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminAuditCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminAuditCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminAudit.
     * @param {AdminAuditDeleteArgs} args - Arguments to delete one AdminAudit.
     * @example
     * // Delete one AdminAudit
     * const AdminAudit = await prisma.adminAudit.delete({
     *   where: {
     *     // ... filter to delete one AdminAudit
     *   }
     * })
     * 
     */
    delete<T extends AdminAuditDeleteArgs>(args: SelectSubset<T, AdminAuditDeleteArgs<ExtArgs>>): Prisma__AdminAuditClient<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminAudit.
     * @param {AdminAuditUpdateArgs} args - Arguments to update one AdminAudit.
     * @example
     * // Update one AdminAudit
     * const adminAudit = await prisma.adminAudit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminAuditUpdateArgs>(args: SelectSubset<T, AdminAuditUpdateArgs<ExtArgs>>): Prisma__AdminAuditClient<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminAudits.
     * @param {AdminAuditDeleteManyArgs} args - Arguments to filter AdminAudits to delete.
     * @example
     * // Delete a few AdminAudits
     * const { count } = await prisma.adminAudit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminAuditDeleteManyArgs>(args?: SelectSubset<T, AdminAuditDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminAudits
     * const adminAudit = await prisma.adminAudit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminAuditUpdateManyArgs>(args: SelectSubset<T, AdminAuditUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminAudits and returns the data updated in the database.
     * @param {AdminAuditUpdateManyAndReturnArgs} args - Arguments to update many AdminAudits.
     * @example
     * // Update many AdminAudits
     * const adminAudit = await prisma.adminAudit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminAudits and only return the `id`
     * const adminAuditWithIdOnly = await prisma.adminAudit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminAuditUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminAuditUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminAudit.
     * @param {AdminAuditUpsertArgs} args - Arguments to update or create a AdminAudit.
     * @example
     * // Update or create a AdminAudit
     * const adminAudit = await prisma.adminAudit.upsert({
     *   create: {
     *     // ... data to create a AdminAudit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminAudit we want to update
     *   }
     * })
     */
    upsert<T extends AdminAuditUpsertArgs>(args: SelectSubset<T, AdminAuditUpsertArgs<ExtArgs>>): Prisma__AdminAuditClient<$Result.GetResult<Prisma.$AdminAuditPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditCountArgs} args - Arguments to filter AdminAudits to count.
     * @example
     * // Count the number of AdminAudits
     * const count = await prisma.adminAudit.count({
     *   where: {
     *     // ... the filter for the AdminAudits we want to count
     *   }
     * })
    **/
    count<T extends AdminAuditCountArgs>(
      args?: Subset<T, AdminAuditCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminAuditCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAuditAggregateArgs>(args: Subset<T, AdminAuditAggregateArgs>): Prisma.PrismaPromise<GetAdminAuditAggregateType<T>>

    /**
     * Group by AdminAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAuditGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminAuditGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminAuditGroupByArgs['orderBy'] }
        : { orderBy?: AdminAuditGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminAuditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminAuditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminAudit model
   */
  readonly fields: AdminAuditFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminAudit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminAuditClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminAudit model
   */
  interface AdminAuditFieldRefs {
    readonly id: FieldRef<"AdminAudit", 'String'>
    readonly adminId: FieldRef<"AdminAudit", 'String'>
    readonly action: FieldRef<"AdminAudit", 'String'>
    readonly targetIds: FieldRef<"AdminAudit", 'String[]'>
    readonly createdAt: FieldRef<"AdminAudit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminAudit findUnique
   */
  export type AdminAuditFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * Filter, which AdminAudit to fetch.
     */
    where: AdminAuditWhereUniqueInput
  }

  /**
   * AdminAudit findUniqueOrThrow
   */
  export type AdminAuditFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * Filter, which AdminAudit to fetch.
     */
    where: AdminAuditWhereUniqueInput
  }

  /**
   * AdminAudit findFirst
   */
  export type AdminAuditFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * Filter, which AdminAudit to fetch.
     */
    where?: AdminAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAudits to fetch.
     */
    orderBy?: AdminAuditOrderByWithRelationInput | AdminAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminAudits.
     */
    cursor?: AdminAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminAudits.
     */
    distinct?: AdminAuditScalarFieldEnum | AdminAuditScalarFieldEnum[]
  }

  /**
   * AdminAudit findFirstOrThrow
   */
  export type AdminAuditFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * Filter, which AdminAudit to fetch.
     */
    where?: AdminAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAudits to fetch.
     */
    orderBy?: AdminAuditOrderByWithRelationInput | AdminAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminAudits.
     */
    cursor?: AdminAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminAudits.
     */
    distinct?: AdminAuditScalarFieldEnum | AdminAuditScalarFieldEnum[]
  }

  /**
   * AdminAudit findMany
   */
  export type AdminAuditFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * Filter, which AdminAudits to fetch.
     */
    where?: AdminAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminAudits to fetch.
     */
    orderBy?: AdminAuditOrderByWithRelationInput | AdminAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminAudits.
     */
    cursor?: AdminAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminAudits.
     */
    skip?: number
    distinct?: AdminAuditScalarFieldEnum | AdminAuditScalarFieldEnum[]
  }

  /**
   * AdminAudit create
   */
  export type AdminAuditCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminAudit.
     */
    data: XOR<AdminAuditCreateInput, AdminAuditUncheckedCreateInput>
  }

  /**
   * AdminAudit createMany
   */
  export type AdminAuditCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminAudits.
     */
    data: AdminAuditCreateManyInput | AdminAuditCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminAudit createManyAndReturn
   */
  export type AdminAuditCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * The data used to create many AdminAudits.
     */
    data: AdminAuditCreateManyInput | AdminAuditCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminAudit update
   */
  export type AdminAuditUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminAudit.
     */
    data: XOR<AdminAuditUpdateInput, AdminAuditUncheckedUpdateInput>
    /**
     * Choose, which AdminAudit to update.
     */
    where: AdminAuditWhereUniqueInput
  }

  /**
   * AdminAudit updateMany
   */
  export type AdminAuditUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminAudits.
     */
    data: XOR<AdminAuditUpdateManyMutationInput, AdminAuditUncheckedUpdateManyInput>
    /**
     * Filter which AdminAudits to update
     */
    where?: AdminAuditWhereInput
    /**
     * Limit how many AdminAudits to update.
     */
    limit?: number
  }

  /**
   * AdminAudit updateManyAndReturn
   */
  export type AdminAuditUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * The data used to update AdminAudits.
     */
    data: XOR<AdminAuditUpdateManyMutationInput, AdminAuditUncheckedUpdateManyInput>
    /**
     * Filter which AdminAudits to update
     */
    where?: AdminAuditWhereInput
    /**
     * Limit how many AdminAudits to update.
     */
    limit?: number
  }

  /**
   * AdminAudit upsert
   */
  export type AdminAuditUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminAudit to update in case it exists.
     */
    where: AdminAuditWhereUniqueInput
    /**
     * In case the AdminAudit found by the `where` argument doesn't exist, create a new AdminAudit with this data.
     */
    create: XOR<AdminAuditCreateInput, AdminAuditUncheckedCreateInput>
    /**
     * In case the AdminAudit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminAuditUpdateInput, AdminAuditUncheckedUpdateInput>
  }

  /**
   * AdminAudit delete
   */
  export type AdminAuditDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
    /**
     * Filter which AdminAudit to delete.
     */
    where: AdminAuditWhereUniqueInput
  }

  /**
   * AdminAudit deleteMany
   */
  export type AdminAuditDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminAudits to delete
     */
    where?: AdminAuditWhereInput
    /**
     * Limit how many AdminAudits to delete.
     */
    limit?: number
  }

  /**
   * AdminAudit without action
   */
  export type AdminAuditDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAudit
     */
    select?: AdminAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAudit
     */
    omit?: AdminAuditOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    phone: 'phone',
    name: 'name',
    role: 'role',
    avatarUrl: 'avatarUrl',
    passwordHash: 'passwordHash',
    consentAnalytics: 'consentAnalytics',
    consentMarketing: 'consentMarketing',
    consentAt: 'consentAt',
    lastSeenAt: 'lastSeenAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConsentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    agreed: 'agreed',
    version: 'version',
    createdAt: 'createdAt'
  };

  export type ConsentScalarFieldEnum = (typeof ConsentScalarFieldEnum)[keyof typeof ConsentScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const ConnectionScalarFieldEnum: {
    id: 'id',
    fromUserId: 'fromUserId',
    toUserId: 'toUserId',
    intimacy: 'intimacy',
    cohabiting: 'cohabiting',
    hasConflict: 'hasConflict',
    responseChannel: 'responseChannel',
    tone: 'tone',
    sensitiveStatus: 'sensitiveStatus',
    currentDepth: 'currentDepth',
    skipCount: 'skipCount',
    answerCount: 'answerCount',
    inviteCode: 'inviteCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConnectionScalarFieldEnum = (typeof ConnectionScalarFieldEnum)[keyof typeof ConnectionScalarFieldEnum]


  export const ConnectionInviteScalarFieldEnum: {
    id: 'id',
    code: 'code',
    childId: 'childId',
    acceptedById: 'acceptedById',
    connectionId: 'connectionId',
    tone: 'tone',
    intimacy: 'intimacy',
    cohabiting: 'cohabiting',
    responseChannel: 'responseChannel',
    createdAt: 'createdAt',
    acceptedAt: 'acceptedAt',
    expiresAt: 'expiresAt'
  };

  export type ConnectionInviteScalarFieldEnum = (typeof ConnectionInviteScalarFieldEnum)[keyof typeof ConnectionInviteScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    connectionId: 'connectionId',
    body: 'body',
    depth: 'depth',
    chapterTag: 'chapterTag',
    personTag: 'personTag',
    eraTag: 'eraTag',
    source: 'source',
    sentAt: 'sentAt',
    createdAt: 'createdAt'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const AnswerScalarFieldEnum: {
    id: 'id',
    questionId: 'questionId',
    format: 'format',
    origin: 'origin',
    body: 'body',
    mediaUrl: 'mediaUrl',
    transcript: 'transcript',
    skipped: 'skipped',
    receivedVia: 'receivedVia',
    isPrivate: 'isPrivate',
    keywords: 'keywords',
    aiComposed: 'aiComposed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnswerScalarFieldEnum = (typeof AnswerScalarFieldEnum)[keyof typeof AnswerScalarFieldEnum]


  export const ReactionScalarFieldEnum: {
    id: 'id',
    answerId: 'answerId',
    userId: 'userId',
    emoji: 'emoji',
    comment: 'comment',
    isFollowup: 'isFollowup',
    notified: 'notified',
    createdAt: 'createdAt'
  };

  export type ReactionScalarFieldEnum = (typeof ReactionScalarFieldEnum)[keyof typeof ReactionScalarFieldEnum]


  export const BookEditionScalarFieldEnum: {
    id: 'id',
    connectionId: 'connectionId',
    rangeFrom: 'rangeFrom',
    rangeTo: 'rangeTo',
    status: 'status',
    editionType: 'editionType',
    chapterData: 'chapterData',
    pdfUrl: 'pdfUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookEditionScalarFieldEnum = (typeof BookEditionScalarFieldEnum)[keyof typeof BookEditionScalarFieldEnum]


  export const CuratedQuestionScalarFieldEnum: {
    id: 'id',
    body: 'body',
    depth: 'depth',
    chapterTag: 'chapterTag',
    personTag: 'personTag',
    eraTag: 'eraTag',
    language: 'language'
  };

  export type CuratedQuestionScalarFieldEnum = (typeof CuratedQuestionScalarFieldEnum)[keyof typeof CuratedQuestionScalarFieldEnum]


  export const AccessLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    email: 'email',
    name: 'name',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    path: 'path',
    referrer: 'referrer',
    createdAt: 'createdAt'
  };

  export type AccessLogScalarFieldEnum = (typeof AccessLogScalarFieldEnum)[keyof typeof AccessLogScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    userId: 'userId'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const InquiryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    email: 'email',
    category: 'category',
    message: 'message',
    status: 'status',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    emailSent: 'emailSent',
    createdAt: 'createdAt'
  };

  export type InquiryScalarFieldEnum = (typeof InquiryScalarFieldEnum)[keyof typeof InquiryScalarFieldEnum]


  export const AdminAuditScalarFieldEnum: {
    id: 'id',
    adminId: 'adminId',
    action: 'action',
    targetIds: 'targetIds',
    createdAt: 'createdAt'
  };

  export type AdminAuditScalarFieldEnum = (typeof AdminAuditScalarFieldEnum)[keyof typeof AdminAuditScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ConsentType'
   */
  export type EnumConsentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsentType'>
    


  /**
   * Reference to a field of type 'ConsentType[]'
   */
  export type ListEnumConsentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsentType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Tone'
   */
  export type EnumToneFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tone'>
    


  /**
   * Reference to a field of type 'Tone[]'
   */
  export type ListEnumToneFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tone[]'>
    


  /**
   * Reference to a field of type 'SensitiveStatus'
   */
  export type EnumSensitiveStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SensitiveStatus'>
    


  /**
   * Reference to a field of type 'SensitiveStatus[]'
   */
  export type ListEnumSensitiveStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SensitiveStatus[]'>
    


  /**
   * Reference to a field of type 'QuestionSource'
   */
  export type EnumQuestionSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionSource'>
    


  /**
   * Reference to a field of type 'QuestionSource[]'
   */
  export type ListEnumQuestionSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionSource[]'>
    


  /**
   * Reference to a field of type 'AnswerFormat'
   */
  export type EnumAnswerFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnswerFormat'>
    


  /**
   * Reference to a field of type 'AnswerFormat[]'
   */
  export type ListEnumAnswerFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnswerFormat[]'>
    


  /**
   * Reference to a field of type 'AnswerOrigin'
   */
  export type EnumAnswerOriginFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnswerOrigin'>
    


  /**
   * Reference to a field of type 'AnswerOrigin[]'
   */
  export type ListEnumAnswerOriginFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnswerOrigin[]'>
    


  /**
   * Reference to a field of type 'BookStatus'
   */
  export type EnumBookStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookStatus'>
    


  /**
   * Reference to a field of type 'BookStatus[]'
   */
  export type ListEnumBookStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookStatus[]'>
    


  /**
   * Reference to a field of type 'BookEditionType'
   */
  export type EnumBookEditionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookEditionType'>
    


  /**
   * Reference to a field of type 'BookEditionType[]'
   */
  export type ListEnumBookEditionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookEditionType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'InquiryCategory'
   */
  export type EnumInquiryCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InquiryCategory'>
    


  /**
   * Reference to a field of type 'InquiryCategory[]'
   */
  export type ListEnumInquiryCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InquiryCategory[]'>
    


  /**
   * Reference to a field of type 'InquiryStatus'
   */
  export type EnumInquiryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InquiryStatus'>
    


  /**
   * Reference to a field of type 'InquiryStatus[]'
   */
  export type ListEnumInquiryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InquiryStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatarUrl?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    consentAnalytics?: BoolFilter<"User"> | boolean
    consentMarketing?: BoolFilter<"User"> | boolean
    consentAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastSeenAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sentConnections?: ConnectionListRelationFilter
    receivedConnections?: ConnectionListRelationFilter
    childInvites?: ConnectionInviteListRelationFilter
    acceptedInvites?: ConnectionInviteListRelationFilter
    sessions?: SessionListRelationFilter
    reactions?: ReactionListRelationFilter
    accessLogs?: AccessLogListRelationFilter
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    consents?: ConsentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    consentAnalytics?: SortOrder
    consentMarketing?: SortOrder
    consentAt?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentConnections?: ConnectionOrderByRelationAggregateInput
    receivedConnections?: ConnectionOrderByRelationAggregateInput
    childInvites?: ConnectionInviteOrderByRelationAggregateInput
    acceptedInvites?: ConnectionInviteOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    reactions?: ReactionOrderByRelationAggregateInput
    accessLogs?: AccessLogOrderByRelationAggregateInput
    admin?: AdminOrderByWithRelationInput
    consents?: ConsentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    avatarUrl?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    consentAnalytics?: BoolFilter<"User"> | boolean
    consentMarketing?: BoolFilter<"User"> | boolean
    consentAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastSeenAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sentConnections?: ConnectionListRelationFilter
    receivedConnections?: ConnectionListRelationFilter
    childInvites?: ConnectionInviteListRelationFilter
    acceptedInvites?: ConnectionInviteListRelationFilter
    sessions?: SessionListRelationFilter
    reactions?: ReactionListRelationFilter
    accessLogs?: AccessLogListRelationFilter
    admin?: XOR<AdminNullableScalarRelationFilter, AdminWhereInput> | null
    consents?: ConsentListRelationFilter
  }, "id" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    consentAnalytics?: SortOrder
    consentMarketing?: SortOrder
    consentAt?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    consentAnalytics?: BoolWithAggregatesFilter<"User"> | boolean
    consentMarketing?: BoolWithAggregatesFilter<"User"> | boolean
    consentAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ConsentWhereInput = {
    AND?: ConsentWhereInput | ConsentWhereInput[]
    OR?: ConsentWhereInput[]
    NOT?: ConsentWhereInput | ConsentWhereInput[]
    id?: StringFilter<"Consent"> | string
    userId?: StringFilter<"Consent"> | string
    type?: EnumConsentTypeFilter<"Consent"> | $Enums.ConsentType
    agreed?: BoolFilter<"Consent"> | boolean
    version?: StringFilter<"Consent"> | string
    createdAt?: DateTimeFilter<"Consent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ConsentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    agreed?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ConsentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConsentWhereInput | ConsentWhereInput[]
    OR?: ConsentWhereInput[]
    NOT?: ConsentWhereInput | ConsentWhereInput[]
    userId?: StringFilter<"Consent"> | string
    type?: EnumConsentTypeFilter<"Consent"> | $Enums.ConsentType
    agreed?: BoolFilter<"Consent"> | boolean
    version?: StringFilter<"Consent"> | string
    createdAt?: DateTimeFilter<"Consent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ConsentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    agreed?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    _count?: ConsentCountOrderByAggregateInput
    _max?: ConsentMaxOrderByAggregateInput
    _min?: ConsentMinOrderByAggregateInput
  }

  export type ConsentScalarWhereWithAggregatesInput = {
    AND?: ConsentScalarWhereWithAggregatesInput | ConsentScalarWhereWithAggregatesInput[]
    OR?: ConsentScalarWhereWithAggregatesInput[]
    NOT?: ConsentScalarWhereWithAggregatesInput | ConsentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Consent"> | string
    userId?: StringWithAggregatesFilter<"Consent"> | string
    type?: EnumConsentTypeWithAggregatesFilter<"Consent"> | $Enums.ConsentType
    agreed?: BoolWithAggregatesFilter<"Consent"> | boolean
    version?: StringWithAggregatesFilter<"Consent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Consent"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type ConnectionWhereInput = {
    AND?: ConnectionWhereInput | ConnectionWhereInput[]
    OR?: ConnectionWhereInput[]
    NOT?: ConnectionWhereInput | ConnectionWhereInput[]
    id?: StringFilter<"Connection"> | string
    fromUserId?: StringFilter<"Connection"> | string
    toUserId?: StringFilter<"Connection"> | string
    intimacy?: IntFilter<"Connection"> | number
    cohabiting?: BoolFilter<"Connection"> | boolean
    hasConflict?: BoolFilter<"Connection"> | boolean
    responseChannel?: StringFilter<"Connection"> | string
    tone?: EnumToneFilter<"Connection"> | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFilter<"Connection"> | $Enums.SensitiveStatus
    currentDepth?: IntFilter<"Connection"> | number
    skipCount?: IntFilter<"Connection"> | number
    answerCount?: IntFilter<"Connection"> | number
    inviteCode?: StringNullableFilter<"Connection"> | string | null
    createdAt?: DateTimeFilter<"Connection"> | Date | string
    updatedAt?: DateTimeFilter<"Connection"> | Date | string
    fromUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    bookEditions?: BookEditionListRelationFilter
    invite?: XOR<ConnectionInviteNullableScalarRelationFilter, ConnectionInviteWhereInput> | null
  }

  export type ConnectionOrderByWithRelationInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    hasConflict?: SortOrder
    responseChannel?: SortOrder
    tone?: SortOrder
    sensitiveStatus?: SortOrder
    currentDepth?: SortOrder
    skipCount?: SortOrder
    answerCount?: SortOrder
    inviteCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fromUser?: UserOrderByWithRelationInput
    toUser?: UserOrderByWithRelationInput
    questions?: QuestionOrderByRelationAggregateInput
    bookEditions?: BookEditionOrderByRelationAggregateInput
    invite?: ConnectionInviteOrderByWithRelationInput
  }

  export type ConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inviteCode?: string
    AND?: ConnectionWhereInput | ConnectionWhereInput[]
    OR?: ConnectionWhereInput[]
    NOT?: ConnectionWhereInput | ConnectionWhereInput[]
    fromUserId?: StringFilter<"Connection"> | string
    toUserId?: StringFilter<"Connection"> | string
    intimacy?: IntFilter<"Connection"> | number
    cohabiting?: BoolFilter<"Connection"> | boolean
    hasConflict?: BoolFilter<"Connection"> | boolean
    responseChannel?: StringFilter<"Connection"> | string
    tone?: EnumToneFilter<"Connection"> | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFilter<"Connection"> | $Enums.SensitiveStatus
    currentDepth?: IntFilter<"Connection"> | number
    skipCount?: IntFilter<"Connection"> | number
    answerCount?: IntFilter<"Connection"> | number
    createdAt?: DateTimeFilter<"Connection"> | Date | string
    updatedAt?: DateTimeFilter<"Connection"> | Date | string
    fromUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    toUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    bookEditions?: BookEditionListRelationFilter
    invite?: XOR<ConnectionInviteNullableScalarRelationFilter, ConnectionInviteWhereInput> | null
  }, "id" | "inviteCode">

  export type ConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    hasConflict?: SortOrder
    responseChannel?: SortOrder
    tone?: SortOrder
    sensitiveStatus?: SortOrder
    currentDepth?: SortOrder
    skipCount?: SortOrder
    answerCount?: SortOrder
    inviteCode?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConnectionCountOrderByAggregateInput
    _avg?: ConnectionAvgOrderByAggregateInput
    _max?: ConnectionMaxOrderByAggregateInput
    _min?: ConnectionMinOrderByAggregateInput
    _sum?: ConnectionSumOrderByAggregateInput
  }

  export type ConnectionScalarWhereWithAggregatesInput = {
    AND?: ConnectionScalarWhereWithAggregatesInput | ConnectionScalarWhereWithAggregatesInput[]
    OR?: ConnectionScalarWhereWithAggregatesInput[]
    NOT?: ConnectionScalarWhereWithAggregatesInput | ConnectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Connection"> | string
    fromUserId?: StringWithAggregatesFilter<"Connection"> | string
    toUserId?: StringWithAggregatesFilter<"Connection"> | string
    intimacy?: IntWithAggregatesFilter<"Connection"> | number
    cohabiting?: BoolWithAggregatesFilter<"Connection"> | boolean
    hasConflict?: BoolWithAggregatesFilter<"Connection"> | boolean
    responseChannel?: StringWithAggregatesFilter<"Connection"> | string
    tone?: EnumToneWithAggregatesFilter<"Connection"> | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusWithAggregatesFilter<"Connection"> | $Enums.SensitiveStatus
    currentDepth?: IntWithAggregatesFilter<"Connection"> | number
    skipCount?: IntWithAggregatesFilter<"Connection"> | number
    answerCount?: IntWithAggregatesFilter<"Connection"> | number
    inviteCode?: StringNullableWithAggregatesFilter<"Connection"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Connection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Connection"> | Date | string
  }

  export type ConnectionInviteWhereInput = {
    AND?: ConnectionInviteWhereInput | ConnectionInviteWhereInput[]
    OR?: ConnectionInviteWhereInput[]
    NOT?: ConnectionInviteWhereInput | ConnectionInviteWhereInput[]
    id?: StringFilter<"ConnectionInvite"> | string
    code?: StringFilter<"ConnectionInvite"> | string
    childId?: StringFilter<"ConnectionInvite"> | string
    acceptedById?: StringNullableFilter<"ConnectionInvite"> | string | null
    connectionId?: StringNullableFilter<"ConnectionInvite"> | string | null
    tone?: EnumToneFilter<"ConnectionInvite"> | $Enums.Tone
    intimacy?: IntFilter<"ConnectionInvite"> | number
    cohabiting?: BoolFilter<"ConnectionInvite"> | boolean
    responseChannel?: StringFilter<"ConnectionInvite"> | string
    createdAt?: DateTimeFilter<"ConnectionInvite"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"ConnectionInvite"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ConnectionInvite"> | Date | string | null
    child?: XOR<UserScalarRelationFilter, UserWhereInput>
    acceptedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    connection?: XOR<ConnectionNullableScalarRelationFilter, ConnectionWhereInput> | null
  }

  export type ConnectionInviteOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    childId?: SortOrder
    acceptedById?: SortOrderInput | SortOrder
    connectionId?: SortOrderInput | SortOrder
    tone?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    responseChannel?: SortOrder
    createdAt?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    child?: UserOrderByWithRelationInput
    acceptedBy?: UserOrderByWithRelationInput
    connection?: ConnectionOrderByWithRelationInput
  }

  export type ConnectionInviteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    connectionId?: string
    AND?: ConnectionInviteWhereInput | ConnectionInviteWhereInput[]
    OR?: ConnectionInviteWhereInput[]
    NOT?: ConnectionInviteWhereInput | ConnectionInviteWhereInput[]
    childId?: StringFilter<"ConnectionInvite"> | string
    acceptedById?: StringNullableFilter<"ConnectionInvite"> | string | null
    tone?: EnumToneFilter<"ConnectionInvite"> | $Enums.Tone
    intimacy?: IntFilter<"ConnectionInvite"> | number
    cohabiting?: BoolFilter<"ConnectionInvite"> | boolean
    responseChannel?: StringFilter<"ConnectionInvite"> | string
    createdAt?: DateTimeFilter<"ConnectionInvite"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"ConnectionInvite"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ConnectionInvite"> | Date | string | null
    child?: XOR<UserScalarRelationFilter, UserWhereInput>
    acceptedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    connection?: XOR<ConnectionNullableScalarRelationFilter, ConnectionWhereInput> | null
  }, "id" | "code" | "connectionId">

  export type ConnectionInviteOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    childId?: SortOrder
    acceptedById?: SortOrderInput | SortOrder
    connectionId?: SortOrderInput | SortOrder
    tone?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    responseChannel?: SortOrder
    createdAt?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: ConnectionInviteCountOrderByAggregateInput
    _avg?: ConnectionInviteAvgOrderByAggregateInput
    _max?: ConnectionInviteMaxOrderByAggregateInput
    _min?: ConnectionInviteMinOrderByAggregateInput
    _sum?: ConnectionInviteSumOrderByAggregateInput
  }

  export type ConnectionInviteScalarWhereWithAggregatesInput = {
    AND?: ConnectionInviteScalarWhereWithAggregatesInput | ConnectionInviteScalarWhereWithAggregatesInput[]
    OR?: ConnectionInviteScalarWhereWithAggregatesInput[]
    NOT?: ConnectionInviteScalarWhereWithAggregatesInput | ConnectionInviteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConnectionInvite"> | string
    code?: StringWithAggregatesFilter<"ConnectionInvite"> | string
    childId?: StringWithAggregatesFilter<"ConnectionInvite"> | string
    acceptedById?: StringNullableWithAggregatesFilter<"ConnectionInvite"> | string | null
    connectionId?: StringNullableWithAggregatesFilter<"ConnectionInvite"> | string | null
    tone?: EnumToneWithAggregatesFilter<"ConnectionInvite"> | $Enums.Tone
    intimacy?: IntWithAggregatesFilter<"ConnectionInvite"> | number
    cohabiting?: BoolWithAggregatesFilter<"ConnectionInvite"> | boolean
    responseChannel?: StringWithAggregatesFilter<"ConnectionInvite"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ConnectionInvite"> | Date | string
    acceptedAt?: DateTimeNullableWithAggregatesFilter<"ConnectionInvite"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ConnectionInvite"> | Date | string | null
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    connectionId?: StringFilter<"Question"> | string
    body?: StringFilter<"Question"> | string
    depth?: IntFilter<"Question"> | number
    chapterTag?: StringNullableFilter<"Question"> | string | null
    personTag?: StringNullableFilter<"Question"> | string | null
    eraTag?: StringNullableFilter<"Question"> | string | null
    source?: EnumQuestionSourceFilter<"Question"> | $Enums.QuestionSource
    sentAt?: DateTimeNullableFilter<"Question"> | Date | string | null
    createdAt?: DateTimeFilter<"Question"> | Date | string
    connection?: XOR<ConnectionScalarRelationFilter, ConnectionWhereInput>
    answer?: XOR<AnswerNullableScalarRelationFilter, AnswerWhereInput> | null
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    connectionId?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrderInput | SortOrder
    personTag?: SortOrderInput | SortOrder
    eraTag?: SortOrderInput | SortOrder
    source?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    connection?: ConnectionOrderByWithRelationInput
    answer?: AnswerOrderByWithRelationInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    connectionId?: StringFilter<"Question"> | string
    body?: StringFilter<"Question"> | string
    depth?: IntFilter<"Question"> | number
    chapterTag?: StringNullableFilter<"Question"> | string | null
    personTag?: StringNullableFilter<"Question"> | string | null
    eraTag?: StringNullableFilter<"Question"> | string | null
    source?: EnumQuestionSourceFilter<"Question"> | $Enums.QuestionSource
    sentAt?: DateTimeNullableFilter<"Question"> | Date | string | null
    createdAt?: DateTimeFilter<"Question"> | Date | string
    connection?: XOR<ConnectionScalarRelationFilter, ConnectionWhereInput>
    answer?: XOR<AnswerNullableScalarRelationFilter, AnswerWhereInput> | null
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    connectionId?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrderInput | SortOrder
    personTag?: SortOrderInput | SortOrder
    eraTag?: SortOrderInput | SortOrder
    source?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _avg?: QuestionAvgOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    connectionId?: StringWithAggregatesFilter<"Question"> | string
    body?: StringWithAggregatesFilter<"Question"> | string
    depth?: IntWithAggregatesFilter<"Question"> | number
    chapterTag?: StringNullableWithAggregatesFilter<"Question"> | string | null
    personTag?: StringNullableWithAggregatesFilter<"Question"> | string | null
    eraTag?: StringNullableWithAggregatesFilter<"Question"> | string | null
    source?: EnumQuestionSourceWithAggregatesFilter<"Question"> | $Enums.QuestionSource
    sentAt?: DateTimeNullableWithAggregatesFilter<"Question"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
  }

  export type AnswerWhereInput = {
    AND?: AnswerWhereInput | AnswerWhereInput[]
    OR?: AnswerWhereInput[]
    NOT?: AnswerWhereInput | AnswerWhereInput[]
    id?: StringFilter<"Answer"> | string
    questionId?: StringFilter<"Answer"> | string
    format?: EnumAnswerFormatFilter<"Answer"> | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFilter<"Answer"> | $Enums.AnswerOrigin
    body?: StringNullableFilter<"Answer"> | string | null
    mediaUrl?: StringNullableFilter<"Answer"> | string | null
    transcript?: StringNullableFilter<"Answer"> | string | null
    skipped?: BoolFilter<"Answer"> | boolean
    receivedVia?: StringFilter<"Answer"> | string
    isPrivate?: BoolFilter<"Answer"> | boolean
    keywords?: StringNullableListFilter<"Answer">
    aiComposed?: BoolFilter<"Answer"> | boolean
    createdAt?: DateTimeFilter<"Answer"> | Date | string
    updatedAt?: DateTimeFilter<"Answer"> | Date | string
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    reactions?: ReactionListRelationFilter
  }

  export type AnswerOrderByWithRelationInput = {
    id?: SortOrder
    questionId?: SortOrder
    format?: SortOrder
    origin?: SortOrder
    body?: SortOrderInput | SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    transcript?: SortOrderInput | SortOrder
    skipped?: SortOrder
    receivedVia?: SortOrder
    isPrivate?: SortOrder
    keywords?: SortOrder
    aiComposed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    question?: QuestionOrderByWithRelationInput
    reactions?: ReactionOrderByRelationAggregateInput
  }

  export type AnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    questionId?: string
    AND?: AnswerWhereInput | AnswerWhereInput[]
    OR?: AnswerWhereInput[]
    NOT?: AnswerWhereInput | AnswerWhereInput[]
    format?: EnumAnswerFormatFilter<"Answer"> | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFilter<"Answer"> | $Enums.AnswerOrigin
    body?: StringNullableFilter<"Answer"> | string | null
    mediaUrl?: StringNullableFilter<"Answer"> | string | null
    transcript?: StringNullableFilter<"Answer"> | string | null
    skipped?: BoolFilter<"Answer"> | boolean
    receivedVia?: StringFilter<"Answer"> | string
    isPrivate?: BoolFilter<"Answer"> | boolean
    keywords?: StringNullableListFilter<"Answer">
    aiComposed?: BoolFilter<"Answer"> | boolean
    createdAt?: DateTimeFilter<"Answer"> | Date | string
    updatedAt?: DateTimeFilter<"Answer"> | Date | string
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    reactions?: ReactionListRelationFilter
  }, "id" | "questionId">

  export type AnswerOrderByWithAggregationInput = {
    id?: SortOrder
    questionId?: SortOrder
    format?: SortOrder
    origin?: SortOrder
    body?: SortOrderInput | SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    transcript?: SortOrderInput | SortOrder
    skipped?: SortOrder
    receivedVia?: SortOrder
    isPrivate?: SortOrder
    keywords?: SortOrder
    aiComposed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnswerCountOrderByAggregateInput
    _max?: AnswerMaxOrderByAggregateInput
    _min?: AnswerMinOrderByAggregateInput
  }

  export type AnswerScalarWhereWithAggregatesInput = {
    AND?: AnswerScalarWhereWithAggregatesInput | AnswerScalarWhereWithAggregatesInput[]
    OR?: AnswerScalarWhereWithAggregatesInput[]
    NOT?: AnswerScalarWhereWithAggregatesInput | AnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Answer"> | string
    questionId?: StringWithAggregatesFilter<"Answer"> | string
    format?: EnumAnswerFormatWithAggregatesFilter<"Answer"> | $Enums.AnswerFormat
    origin?: EnumAnswerOriginWithAggregatesFilter<"Answer"> | $Enums.AnswerOrigin
    body?: StringNullableWithAggregatesFilter<"Answer"> | string | null
    mediaUrl?: StringNullableWithAggregatesFilter<"Answer"> | string | null
    transcript?: StringNullableWithAggregatesFilter<"Answer"> | string | null
    skipped?: BoolWithAggregatesFilter<"Answer"> | boolean
    receivedVia?: StringWithAggregatesFilter<"Answer"> | string
    isPrivate?: BoolWithAggregatesFilter<"Answer"> | boolean
    keywords?: StringNullableListFilter<"Answer">
    aiComposed?: BoolWithAggregatesFilter<"Answer"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Answer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Answer"> | Date | string
  }

  export type ReactionWhereInput = {
    AND?: ReactionWhereInput | ReactionWhereInput[]
    OR?: ReactionWhereInput[]
    NOT?: ReactionWhereInput | ReactionWhereInput[]
    id?: StringFilter<"Reaction"> | string
    answerId?: StringFilter<"Reaction"> | string
    userId?: StringFilter<"Reaction"> | string
    emoji?: StringNullableFilter<"Reaction"> | string | null
    comment?: StringNullableFilter<"Reaction"> | string | null
    isFollowup?: BoolFilter<"Reaction"> | boolean
    notified?: BoolFilter<"Reaction"> | boolean
    createdAt?: DateTimeFilter<"Reaction"> | Date | string
    answer?: XOR<AnswerScalarRelationFilter, AnswerWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReactionOrderByWithRelationInput = {
    id?: SortOrder
    answerId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    isFollowup?: SortOrder
    notified?: SortOrder
    createdAt?: SortOrder
    answer?: AnswerOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReactionWhereInput | ReactionWhereInput[]
    OR?: ReactionWhereInput[]
    NOT?: ReactionWhereInput | ReactionWhereInput[]
    answerId?: StringFilter<"Reaction"> | string
    userId?: StringFilter<"Reaction"> | string
    emoji?: StringNullableFilter<"Reaction"> | string | null
    comment?: StringNullableFilter<"Reaction"> | string | null
    isFollowup?: BoolFilter<"Reaction"> | boolean
    notified?: BoolFilter<"Reaction"> | boolean
    createdAt?: DateTimeFilter<"Reaction"> | Date | string
    answer?: XOR<AnswerScalarRelationFilter, AnswerWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ReactionOrderByWithAggregationInput = {
    id?: SortOrder
    answerId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    isFollowup?: SortOrder
    notified?: SortOrder
    createdAt?: SortOrder
    _count?: ReactionCountOrderByAggregateInput
    _max?: ReactionMaxOrderByAggregateInput
    _min?: ReactionMinOrderByAggregateInput
  }

  export type ReactionScalarWhereWithAggregatesInput = {
    AND?: ReactionScalarWhereWithAggregatesInput | ReactionScalarWhereWithAggregatesInput[]
    OR?: ReactionScalarWhereWithAggregatesInput[]
    NOT?: ReactionScalarWhereWithAggregatesInput | ReactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reaction"> | string
    answerId?: StringWithAggregatesFilter<"Reaction"> | string
    userId?: StringWithAggregatesFilter<"Reaction"> | string
    emoji?: StringNullableWithAggregatesFilter<"Reaction"> | string | null
    comment?: StringNullableWithAggregatesFilter<"Reaction"> | string | null
    isFollowup?: BoolWithAggregatesFilter<"Reaction"> | boolean
    notified?: BoolWithAggregatesFilter<"Reaction"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Reaction"> | Date | string
  }

  export type BookEditionWhereInput = {
    AND?: BookEditionWhereInput | BookEditionWhereInput[]
    OR?: BookEditionWhereInput[]
    NOT?: BookEditionWhereInput | BookEditionWhereInput[]
    id?: StringFilter<"BookEdition"> | string
    connectionId?: StringFilter<"BookEdition"> | string
    rangeFrom?: DateTimeFilter<"BookEdition"> | Date | string
    rangeTo?: DateTimeNullableFilter<"BookEdition"> | Date | string | null
    status?: EnumBookStatusFilter<"BookEdition"> | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFilter<"BookEdition"> | $Enums.BookEditionType
    chapterData?: JsonNullableFilter<"BookEdition">
    pdfUrl?: StringNullableFilter<"BookEdition"> | string | null
    createdAt?: DateTimeFilter<"BookEdition"> | Date | string
    updatedAt?: DateTimeFilter<"BookEdition"> | Date | string
    connection?: XOR<ConnectionScalarRelationFilter, ConnectionWhereInput>
  }

  export type BookEditionOrderByWithRelationInput = {
    id?: SortOrder
    connectionId?: SortOrder
    rangeFrom?: SortOrder
    rangeTo?: SortOrderInput | SortOrder
    status?: SortOrder
    editionType?: SortOrder
    chapterData?: SortOrderInput | SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    connection?: ConnectionOrderByWithRelationInput
  }

  export type BookEditionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookEditionWhereInput | BookEditionWhereInput[]
    OR?: BookEditionWhereInput[]
    NOT?: BookEditionWhereInput | BookEditionWhereInput[]
    connectionId?: StringFilter<"BookEdition"> | string
    rangeFrom?: DateTimeFilter<"BookEdition"> | Date | string
    rangeTo?: DateTimeNullableFilter<"BookEdition"> | Date | string | null
    status?: EnumBookStatusFilter<"BookEdition"> | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFilter<"BookEdition"> | $Enums.BookEditionType
    chapterData?: JsonNullableFilter<"BookEdition">
    pdfUrl?: StringNullableFilter<"BookEdition"> | string | null
    createdAt?: DateTimeFilter<"BookEdition"> | Date | string
    updatedAt?: DateTimeFilter<"BookEdition"> | Date | string
    connection?: XOR<ConnectionScalarRelationFilter, ConnectionWhereInput>
  }, "id">

  export type BookEditionOrderByWithAggregationInput = {
    id?: SortOrder
    connectionId?: SortOrder
    rangeFrom?: SortOrder
    rangeTo?: SortOrderInput | SortOrder
    status?: SortOrder
    editionType?: SortOrder
    chapterData?: SortOrderInput | SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookEditionCountOrderByAggregateInput
    _max?: BookEditionMaxOrderByAggregateInput
    _min?: BookEditionMinOrderByAggregateInput
  }

  export type BookEditionScalarWhereWithAggregatesInput = {
    AND?: BookEditionScalarWhereWithAggregatesInput | BookEditionScalarWhereWithAggregatesInput[]
    OR?: BookEditionScalarWhereWithAggregatesInput[]
    NOT?: BookEditionScalarWhereWithAggregatesInput | BookEditionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BookEdition"> | string
    connectionId?: StringWithAggregatesFilter<"BookEdition"> | string
    rangeFrom?: DateTimeWithAggregatesFilter<"BookEdition"> | Date | string
    rangeTo?: DateTimeNullableWithAggregatesFilter<"BookEdition"> | Date | string | null
    status?: EnumBookStatusWithAggregatesFilter<"BookEdition"> | $Enums.BookStatus
    editionType?: EnumBookEditionTypeWithAggregatesFilter<"BookEdition"> | $Enums.BookEditionType
    chapterData?: JsonNullableWithAggregatesFilter<"BookEdition">
    pdfUrl?: StringNullableWithAggregatesFilter<"BookEdition"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BookEdition"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BookEdition"> | Date | string
  }

  export type CuratedQuestionWhereInput = {
    AND?: CuratedQuestionWhereInput | CuratedQuestionWhereInput[]
    OR?: CuratedQuestionWhereInput[]
    NOT?: CuratedQuestionWhereInput | CuratedQuestionWhereInput[]
    id?: StringFilter<"CuratedQuestion"> | string
    body?: StringFilter<"CuratedQuestion"> | string
    depth?: IntFilter<"CuratedQuestion"> | number
    chapterTag?: StringFilter<"CuratedQuestion"> | string
    personTag?: StringNullableFilter<"CuratedQuestion"> | string | null
    eraTag?: StringNullableFilter<"CuratedQuestion"> | string | null
    language?: StringFilter<"CuratedQuestion"> | string
  }

  export type CuratedQuestionOrderByWithRelationInput = {
    id?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrder
    personTag?: SortOrderInput | SortOrder
    eraTag?: SortOrderInput | SortOrder
    language?: SortOrder
  }

  export type CuratedQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CuratedQuestionWhereInput | CuratedQuestionWhereInput[]
    OR?: CuratedQuestionWhereInput[]
    NOT?: CuratedQuestionWhereInput | CuratedQuestionWhereInput[]
    body?: StringFilter<"CuratedQuestion"> | string
    depth?: IntFilter<"CuratedQuestion"> | number
    chapterTag?: StringFilter<"CuratedQuestion"> | string
    personTag?: StringNullableFilter<"CuratedQuestion"> | string | null
    eraTag?: StringNullableFilter<"CuratedQuestion"> | string | null
    language?: StringFilter<"CuratedQuestion"> | string
  }, "id">

  export type CuratedQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrder
    personTag?: SortOrderInput | SortOrder
    eraTag?: SortOrderInput | SortOrder
    language?: SortOrder
    _count?: CuratedQuestionCountOrderByAggregateInput
    _avg?: CuratedQuestionAvgOrderByAggregateInput
    _max?: CuratedQuestionMaxOrderByAggregateInput
    _min?: CuratedQuestionMinOrderByAggregateInput
    _sum?: CuratedQuestionSumOrderByAggregateInput
  }

  export type CuratedQuestionScalarWhereWithAggregatesInput = {
    AND?: CuratedQuestionScalarWhereWithAggregatesInput | CuratedQuestionScalarWhereWithAggregatesInput[]
    OR?: CuratedQuestionScalarWhereWithAggregatesInput[]
    NOT?: CuratedQuestionScalarWhereWithAggregatesInput | CuratedQuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CuratedQuestion"> | string
    body?: StringWithAggregatesFilter<"CuratedQuestion"> | string
    depth?: IntWithAggregatesFilter<"CuratedQuestion"> | number
    chapterTag?: StringWithAggregatesFilter<"CuratedQuestion"> | string
    personTag?: StringNullableWithAggregatesFilter<"CuratedQuestion"> | string | null
    eraTag?: StringNullableWithAggregatesFilter<"CuratedQuestion"> | string | null
    language?: StringWithAggregatesFilter<"CuratedQuestion"> | string
  }

  export type AccessLogWhereInput = {
    AND?: AccessLogWhereInput | AccessLogWhereInput[]
    OR?: AccessLogWhereInput[]
    NOT?: AccessLogWhereInput | AccessLogWhereInput[]
    id?: StringFilter<"AccessLog"> | string
    userId?: StringNullableFilter<"AccessLog"> | string | null
    email?: StringNullableFilter<"AccessLog"> | string | null
    name?: StringNullableFilter<"AccessLog"> | string | null
    ipAddress?: StringNullableFilter<"AccessLog"> | string | null
    userAgent?: StringNullableFilter<"AccessLog"> | string | null
    path?: StringNullableFilter<"AccessLog"> | string | null
    referrer?: StringNullableFilter<"AccessLog"> | string | null
    createdAt?: DateTimeFilter<"AccessLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AccessLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccessLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccessLogWhereInput | AccessLogWhereInput[]
    OR?: AccessLogWhereInput[]
    NOT?: AccessLogWhereInput | AccessLogWhereInput[]
    userId?: StringNullableFilter<"AccessLog"> | string | null
    email?: StringNullableFilter<"AccessLog"> | string | null
    name?: StringNullableFilter<"AccessLog"> | string | null
    ipAddress?: StringNullableFilter<"AccessLog"> | string | null
    userAgent?: StringNullableFilter<"AccessLog"> | string | null
    path?: StringNullableFilter<"AccessLog"> | string | null
    referrer?: StringNullableFilter<"AccessLog"> | string | null
    createdAt?: DateTimeFilter<"AccessLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AccessLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AccessLogCountOrderByAggregateInput
    _max?: AccessLogMaxOrderByAggregateInput
    _min?: AccessLogMinOrderByAggregateInput
  }

  export type AccessLogScalarWhereWithAggregatesInput = {
    AND?: AccessLogScalarWhereWithAggregatesInput | AccessLogScalarWhereWithAggregatesInput[]
    OR?: AccessLogScalarWhereWithAggregatesInput[]
    NOT?: AccessLogScalarWhereWithAggregatesInput | AccessLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AccessLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    email?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    name?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    path?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    referrer?: StringNullableWithAggregatesFilter<"AccessLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AccessLog"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    userId?: StringFilter<"Admin"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    userId?: StringWithAggregatesFilter<"Admin"> | string
  }

  export type InquiryWhereInput = {
    AND?: InquiryWhereInput | InquiryWhereInput[]
    OR?: InquiryWhereInput[]
    NOT?: InquiryWhereInput | InquiryWhereInput[]
    id?: StringFilter<"Inquiry"> | string
    userId?: StringNullableFilter<"Inquiry"> | string | null
    email?: StringFilter<"Inquiry"> | string
    category?: EnumInquiryCategoryNullableFilter<"Inquiry"> | $Enums.InquiryCategory | null
    message?: StringFilter<"Inquiry"> | string
    status?: EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus
    ipAddress?: StringNullableFilter<"Inquiry"> | string | null
    userAgent?: StringNullableFilter<"Inquiry"> | string | null
    emailSent?: BoolFilter<"Inquiry"> | boolean
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
  }

  export type InquiryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    email?: SortOrder
    category?: SortOrderInput | SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InquiryWhereInput | InquiryWhereInput[]
    OR?: InquiryWhereInput[]
    NOT?: InquiryWhereInput | InquiryWhereInput[]
    userId?: StringNullableFilter<"Inquiry"> | string | null
    email?: StringFilter<"Inquiry"> | string
    category?: EnumInquiryCategoryNullableFilter<"Inquiry"> | $Enums.InquiryCategory | null
    message?: StringFilter<"Inquiry"> | string
    status?: EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus
    ipAddress?: StringNullableFilter<"Inquiry"> | string | null
    userAgent?: StringNullableFilter<"Inquiry"> | string | null
    emailSent?: BoolFilter<"Inquiry"> | boolean
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
  }, "id">

  export type InquiryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    email?: SortOrder
    category?: SortOrderInput | SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
    _count?: InquiryCountOrderByAggregateInput
    _max?: InquiryMaxOrderByAggregateInput
    _min?: InquiryMinOrderByAggregateInput
  }

  export type InquiryScalarWhereWithAggregatesInput = {
    AND?: InquiryScalarWhereWithAggregatesInput | InquiryScalarWhereWithAggregatesInput[]
    OR?: InquiryScalarWhereWithAggregatesInput[]
    NOT?: InquiryScalarWhereWithAggregatesInput | InquiryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Inquiry"> | string
    userId?: StringNullableWithAggregatesFilter<"Inquiry"> | string | null
    email?: StringWithAggregatesFilter<"Inquiry"> | string
    category?: EnumInquiryCategoryNullableWithAggregatesFilter<"Inquiry"> | $Enums.InquiryCategory | null
    message?: StringWithAggregatesFilter<"Inquiry"> | string
    status?: EnumInquiryStatusWithAggregatesFilter<"Inquiry"> | $Enums.InquiryStatus
    ipAddress?: StringNullableWithAggregatesFilter<"Inquiry"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Inquiry"> | string | null
    emailSent?: BoolWithAggregatesFilter<"Inquiry"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Inquiry"> | Date | string
  }

  export type AdminAuditWhereInput = {
    AND?: AdminAuditWhereInput | AdminAuditWhereInput[]
    OR?: AdminAuditWhereInput[]
    NOT?: AdminAuditWhereInput | AdminAuditWhereInput[]
    id?: StringFilter<"AdminAudit"> | string
    adminId?: StringFilter<"AdminAudit"> | string
    action?: StringFilter<"AdminAudit"> | string
    targetIds?: StringNullableListFilter<"AdminAudit">
    createdAt?: DateTimeFilter<"AdminAudit"> | Date | string
  }

  export type AdminAuditOrderByWithRelationInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    targetIds?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminAuditWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminAuditWhereInput | AdminAuditWhereInput[]
    OR?: AdminAuditWhereInput[]
    NOT?: AdminAuditWhereInput | AdminAuditWhereInput[]
    adminId?: StringFilter<"AdminAudit"> | string
    action?: StringFilter<"AdminAudit"> | string
    targetIds?: StringNullableListFilter<"AdminAudit">
    createdAt?: DateTimeFilter<"AdminAudit"> | Date | string
  }, "id">

  export type AdminAuditOrderByWithAggregationInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    targetIds?: SortOrder
    createdAt?: SortOrder
    _count?: AdminAuditCountOrderByAggregateInput
    _max?: AdminAuditMaxOrderByAggregateInput
    _min?: AdminAuditMinOrderByAggregateInput
  }

  export type AdminAuditScalarWhereWithAggregatesInput = {
    AND?: AdminAuditScalarWhereWithAggregatesInput | AdminAuditScalarWhereWithAggregatesInput[]
    OR?: AdminAuditScalarWhereWithAggregatesInput[]
    NOT?: AdminAuditScalarWhereWithAggregatesInput | AdminAuditScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminAudit"> | string
    adminId?: StringWithAggregatesFilter<"AdminAudit"> | string
    action?: StringWithAggregatesFilter<"AdminAudit"> | string
    targetIds?: StringNullableListFilter<"AdminAudit">
    createdAt?: DateTimeWithAggregatesFilter<"AdminAudit"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogCreateNestedManyWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionUncheckedCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionUncheckedCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUpdateManyWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUncheckedUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUncheckedUpdateManyWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentCreateInput = {
    id?: string
    type: $Enums.ConsentType
    agreed: boolean
    version?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutConsentsInput
  }

  export type ConsentUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.ConsentType
    agreed: boolean
    version?: string
    createdAt?: Date | string
  }

  export type ConsentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    agreed?: BoolFieldUpdateOperationsInput | boolean
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConsentsNestedInput
  }

  export type ConsentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    agreed?: BoolFieldUpdateOperationsInput | boolean
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.ConsentType
    agreed: boolean
    version?: string
    createdAt?: Date | string
  }

  export type ConsentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    agreed?: BoolFieldUpdateOperationsInput | boolean
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    agreed?: BoolFieldUpdateOperationsInput | boolean
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    token?: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    token?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    token?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionCreateInput = {
    id?: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutSentConnectionsInput
    toUser: UserCreateNestedOneWithoutReceivedConnectionsInput
    questions?: QuestionCreateNestedManyWithoutConnectionInput
    bookEditions?: BookEditionCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateInput = {
    id?: string
    fromUserId: string
    toUserId: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutConnectionInput
    bookEditions?: BookEditionUncheckedCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteUncheckedCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutSentConnectionsNestedInput
    toUser?: UserUpdateOneRequiredWithoutReceivedConnectionsNestedInput
    questions?: QuestionUpdateManyWithoutConnectionNestedInput
    bookEditions?: BookEditionUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUpdateOneWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutConnectionNestedInput
    bookEditions?: BookEditionUncheckedUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUncheckedUpdateOneWithoutConnectionNestedInput
  }

  export type ConnectionCreateManyInput = {
    id?: string
    fromUserId: string
    toUserId: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionInviteCreateInput = {
    id?: string
    code: string
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
    child: UserCreateNestedOneWithoutChildInvitesInput
    acceptedBy?: UserCreateNestedOneWithoutAcceptedInvitesInput
    connection?: ConnectionCreateNestedOneWithoutInviteInput
  }

  export type ConnectionInviteUncheckedCreateInput = {
    id?: string
    code: string
    childId: string
    acceptedById?: string | null
    connectionId?: string | null
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConnectionInviteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    child?: UserUpdateOneRequiredWithoutChildInvitesNestedInput
    acceptedBy?: UserUpdateOneWithoutAcceptedInvitesNestedInput
    connection?: ConnectionUpdateOneWithoutInviteNestedInput
  }

  export type ConnectionInviteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    acceptedById?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConnectionInviteCreateManyInput = {
    id?: string
    code: string
    childId: string
    acceptedById?: string | null
    connectionId?: string | null
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConnectionInviteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConnectionInviteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    acceptedById?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuestionCreateInput = {
    id?: string
    body: string
    depth: number
    chapterTag?: string | null
    personTag?: string | null
    eraTag?: string | null
    source?: $Enums.QuestionSource
    sentAt?: Date | string | null
    createdAt?: Date | string
    connection: ConnectionCreateNestedOneWithoutQuestionsInput
    answer?: AnswerCreateNestedOneWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    connectionId: string
    body: string
    depth: number
    chapterTag?: string | null
    personTag?: string | null
    eraTag?: string | null
    source?: $Enums.QuestionSource
    sentAt?: Date | string | null
    createdAt?: Date | string
    answer?: AnswerUncheckedCreateNestedOneWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: NullableStringFieldUpdateOperationsInput | string | null
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    source?: EnumQuestionSourceFieldUpdateOperationsInput | $Enums.QuestionSource
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutQuestionsNestedInput
    answer?: AnswerUpdateOneWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: NullableStringFieldUpdateOperationsInput | string | null
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    source?: EnumQuestionSourceFieldUpdateOperationsInput | $Enums.QuestionSource
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answer?: AnswerUncheckedUpdateOneWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: string
    connectionId: string
    body: string
    depth: number
    chapterTag?: string | null
    personTag?: string | null
    eraTag?: string | null
    source?: $Enums.QuestionSource
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: NullableStringFieldUpdateOperationsInput | string | null
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    source?: EnumQuestionSourceFieldUpdateOperationsInput | $Enums.QuestionSource
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: NullableStringFieldUpdateOperationsInput | string | null
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    source?: EnumQuestionSourceFieldUpdateOperationsInput | $Enums.QuestionSource
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerCreateInput = {
    id?: string
    format?: $Enums.AnswerFormat
    origin?: $Enums.AnswerOrigin
    body?: string | null
    mediaUrl?: string | null
    transcript?: string | null
    skipped?: boolean
    receivedVia?: string
    isPrivate?: boolean
    keywords?: AnswerCreatekeywordsInput | string[]
    aiComposed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    question: QuestionCreateNestedOneWithoutAnswerInput
    reactions?: ReactionCreateNestedManyWithoutAnswerInput
  }

  export type AnswerUncheckedCreateInput = {
    id?: string
    questionId: string
    format?: $Enums.AnswerFormat
    origin?: $Enums.AnswerOrigin
    body?: string | null
    mediaUrl?: string | null
    transcript?: string | null
    skipped?: boolean
    receivedVia?: string
    isPrivate?: boolean
    keywords?: AnswerCreatekeywordsInput | string[]
    aiComposed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: ReactionUncheckedCreateNestedManyWithoutAnswerInput
  }

  export type AnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: EnumAnswerFormatFieldUpdateOperationsInput | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFieldUpdateOperationsInput | $Enums.AnswerOrigin
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    skipped?: BoolFieldUpdateOperationsInput | boolean
    receivedVia?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    keywords?: AnswerUpdatekeywordsInput | string[]
    aiComposed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutAnswerNestedInput
    reactions?: ReactionUpdateManyWithoutAnswerNestedInput
  }

  export type AnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    format?: EnumAnswerFormatFieldUpdateOperationsInput | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFieldUpdateOperationsInput | $Enums.AnswerOrigin
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    skipped?: BoolFieldUpdateOperationsInput | boolean
    receivedVia?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    keywords?: AnswerUpdatekeywordsInput | string[]
    aiComposed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: ReactionUncheckedUpdateManyWithoutAnswerNestedInput
  }

  export type AnswerCreateManyInput = {
    id?: string
    questionId: string
    format?: $Enums.AnswerFormat
    origin?: $Enums.AnswerOrigin
    body?: string | null
    mediaUrl?: string | null
    transcript?: string | null
    skipped?: boolean
    receivedVia?: string
    isPrivate?: boolean
    keywords?: AnswerCreatekeywordsInput | string[]
    aiComposed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: EnumAnswerFormatFieldUpdateOperationsInput | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFieldUpdateOperationsInput | $Enums.AnswerOrigin
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    skipped?: BoolFieldUpdateOperationsInput | boolean
    receivedVia?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    keywords?: AnswerUpdatekeywordsInput | string[]
    aiComposed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    format?: EnumAnswerFormatFieldUpdateOperationsInput | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFieldUpdateOperationsInput | $Enums.AnswerOrigin
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    skipped?: BoolFieldUpdateOperationsInput | boolean
    receivedVia?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    keywords?: AnswerUpdatekeywordsInput | string[]
    aiComposed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionCreateInput = {
    id?: string
    emoji?: string | null
    comment?: string | null
    isFollowup?: boolean
    notified?: boolean
    createdAt?: Date | string
    answer: AnswerCreateNestedOneWithoutReactionsInput
    user: UserCreateNestedOneWithoutReactionsInput
  }

  export type ReactionUncheckedCreateInput = {
    id?: string
    answerId: string
    userId: string
    emoji?: string | null
    comment?: string | null
    isFollowup?: boolean
    notified?: boolean
    createdAt?: Date | string
  }

  export type ReactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answer?: AnswerUpdateOneRequiredWithoutReactionsNestedInput
    user?: UserUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type ReactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionCreateManyInput = {
    id?: string
    answerId: string
    userId: string
    emoji?: string | null
    comment?: string | null
    isFollowup?: boolean
    notified?: boolean
    createdAt?: Date | string
  }

  export type ReactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookEditionCreateInput = {
    id?: string
    rangeFrom: Date | string
    rangeTo?: Date | string | null
    status?: $Enums.BookStatus
    editionType?: $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connection: ConnectionCreateNestedOneWithoutBookEditionsInput
  }

  export type BookEditionUncheckedCreateInput = {
    id?: string
    connectionId: string
    rangeFrom: Date | string
    rangeTo?: Date | string | null
    status?: $Enums.BookStatus
    editionType?: $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookEditionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rangeFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    rangeTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFieldUpdateOperationsInput | $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutBookEditionsNestedInput
  }

  export type BookEditionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    rangeFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    rangeTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFieldUpdateOperationsInput | $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookEditionCreateManyInput = {
    id?: string
    connectionId: string
    rangeFrom: Date | string
    rangeTo?: Date | string | null
    status?: $Enums.BookStatus
    editionType?: $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookEditionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rangeFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    rangeTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFieldUpdateOperationsInput | $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookEditionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    rangeFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    rangeTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFieldUpdateOperationsInput | $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CuratedQuestionCreateInput = {
    id?: string
    body: string
    depth: number
    chapterTag: string
    personTag?: string | null
    eraTag?: string | null
    language?: string
  }

  export type CuratedQuestionUncheckedCreateInput = {
    id?: string
    body: string
    depth: number
    chapterTag: string
    personTag?: string | null
    eraTag?: string | null
    language?: string
  }

  export type CuratedQuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: StringFieldUpdateOperationsInput | string
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
  }

  export type CuratedQuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: StringFieldUpdateOperationsInput | string
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
  }

  export type CuratedQuestionCreateManyInput = {
    id?: string
    body: string
    depth: number
    chapterTag: string
    personTag?: string | null
    eraTag?: string | null
    language?: string
  }

  export type CuratedQuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: StringFieldUpdateOperationsInput | string
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
  }

  export type CuratedQuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: StringFieldUpdateOperationsInput | string
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
  }

  export type AccessLogCreateInput = {
    id?: string
    email?: string | null
    name?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    path?: string | null
    referrer?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAccessLogsInput
  }

  export type AccessLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    email?: string | null
    name?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    path?: string | null
    referrer?: string | null
    createdAt?: Date | string
  }

  export type AccessLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAccessLogsNestedInput
  }

  export type AccessLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessLogCreateManyInput = {
    id?: string
    userId?: string | null
    email?: string | null
    name?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    path?: string | null
    referrer?: string | null
    createdAt?: Date | string
  }

  export type AccessLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    id?: string
    user: UserCreateNestedOneWithoutAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    userId: string
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AdminCreateManyInput = {
    id?: string
    userId: string
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type InquiryCreateInput = {
    id?: string
    userId?: string | null
    email: string
    category?: $Enums.InquiryCategory | null
    message: string
    status?: $Enums.InquiryStatus
    ipAddress?: string | null
    userAgent?: string | null
    emailSent?: boolean
    createdAt?: Date | string
  }

  export type InquiryUncheckedCreateInput = {
    id?: string
    userId?: string | null
    email: string
    category?: $Enums.InquiryCategory | null
    message: string
    status?: $Enums.InquiryStatus
    ipAddress?: string | null
    userAgent?: string | null
    emailSent?: boolean
    createdAt?: Date | string
  }

  export type InquiryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    category?: NullableEnumInquiryCategoryFieldUpdateOperationsInput | $Enums.InquiryCategory | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    category?: NullableEnumInquiryCategoryFieldUpdateOperationsInput | $Enums.InquiryCategory | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryCreateManyInput = {
    id?: string
    userId?: string | null
    email: string
    category?: $Enums.InquiryCategory | null
    message: string
    status?: $Enums.InquiryStatus
    ipAddress?: string | null
    userAgent?: string | null
    emailSent?: boolean
    createdAt?: Date | string
  }

  export type InquiryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    category?: NullableEnumInquiryCategoryFieldUpdateOperationsInput | $Enums.InquiryCategory | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    category?: NullableEnumInquiryCategoryFieldUpdateOperationsInput | $Enums.InquiryCategory | null
    message?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    emailSent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAuditCreateInput = {
    id?: string
    adminId: string
    action: string
    targetIds?: AdminAuditCreatetargetIdsInput | string[]
    createdAt?: Date | string
  }

  export type AdminAuditUncheckedCreateInput = {
    id?: string
    adminId: string
    action: string
    targetIds?: AdminAuditCreatetargetIdsInput | string[]
    createdAt?: Date | string
  }

  export type AdminAuditUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetIds?: AdminAuditUpdatetargetIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAuditUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetIds?: AdminAuditUpdatetargetIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAuditCreateManyInput = {
    id?: string
    adminId: string
    action: string
    targetIds?: AdminAuditCreatetargetIdsInput | string[]
    createdAt?: Date | string
  }

  export type AdminAuditUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetIds?: AdminAuditUpdatetargetIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminAuditUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    targetIds?: AdminAuditUpdatetargetIdsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ConnectionListRelationFilter = {
    every?: ConnectionWhereInput
    some?: ConnectionWhereInput
    none?: ConnectionWhereInput
  }

  export type ConnectionInviteListRelationFilter = {
    every?: ConnectionInviteWhereInput
    some?: ConnectionInviteWhereInput
    none?: ConnectionInviteWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type ReactionListRelationFilter = {
    every?: ReactionWhereInput
    some?: ReactionWhereInput
    none?: ReactionWhereInput
  }

  export type AccessLogListRelationFilter = {
    every?: AccessLogWhereInput
    some?: AccessLogWhereInput
    none?: AccessLogWhereInput
  }

  export type AdminNullableScalarRelationFilter = {
    is?: AdminWhereInput | null
    isNot?: AdminWhereInput | null
  }

  export type ConsentListRelationFilter = {
    every?: ConsentWhereInput
    some?: ConsentWhereInput
    none?: ConsentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConnectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConnectionInviteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccessLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConsentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrder
    passwordHash?: SortOrder
    consentAnalytics?: SortOrder
    consentMarketing?: SortOrder
    consentAt?: SortOrder
    lastSeenAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrder
    passwordHash?: SortOrder
    consentAnalytics?: SortOrder
    consentMarketing?: SortOrder
    consentAt?: SortOrder
    lastSeenAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    name?: SortOrder
    role?: SortOrder
    avatarUrl?: SortOrder
    passwordHash?: SortOrder
    consentAnalytics?: SortOrder
    consentMarketing?: SortOrder
    consentAt?: SortOrder
    lastSeenAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumConsentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentType | EnumConsentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentTypeFilter<$PrismaModel> | $Enums.ConsentType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ConsentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    agreed?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
  }

  export type ConsentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    agreed?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
  }

  export type ConsentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    agreed?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumConsentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentType | EnumConsentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConsentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsentTypeFilter<$PrismaModel>
    _max?: NestedEnumConsentTypeFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumToneFilter<$PrismaModel = never> = {
    equals?: $Enums.Tone | EnumToneFieldRefInput<$PrismaModel>
    in?: $Enums.Tone[] | ListEnumToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tone[] | ListEnumToneFieldRefInput<$PrismaModel>
    not?: NestedEnumToneFilter<$PrismaModel> | $Enums.Tone
  }

  export type EnumSensitiveStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SensitiveStatus | EnumSensitiveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SensitiveStatus[] | ListEnumSensitiveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SensitiveStatus[] | ListEnumSensitiveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSensitiveStatusFilter<$PrismaModel> | $Enums.SensitiveStatus
  }

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type BookEditionListRelationFilter = {
    every?: BookEditionWhereInput
    some?: BookEditionWhereInput
    none?: BookEditionWhereInput
  }

  export type ConnectionInviteNullableScalarRelationFilter = {
    is?: ConnectionInviteWhereInput | null
    isNot?: ConnectionInviteWhereInput | null
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookEditionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    hasConflict?: SortOrder
    responseChannel?: SortOrder
    tone?: SortOrder
    sensitiveStatus?: SortOrder
    currentDepth?: SortOrder
    skipCount?: SortOrder
    answerCount?: SortOrder
    inviteCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConnectionAvgOrderByAggregateInput = {
    intimacy?: SortOrder
    currentDepth?: SortOrder
    skipCount?: SortOrder
    answerCount?: SortOrder
  }

  export type ConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    hasConflict?: SortOrder
    responseChannel?: SortOrder
    tone?: SortOrder
    sensitiveStatus?: SortOrder
    currentDepth?: SortOrder
    skipCount?: SortOrder
    answerCount?: SortOrder
    inviteCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    fromUserId?: SortOrder
    toUserId?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    hasConflict?: SortOrder
    responseChannel?: SortOrder
    tone?: SortOrder
    sensitiveStatus?: SortOrder
    currentDepth?: SortOrder
    skipCount?: SortOrder
    answerCount?: SortOrder
    inviteCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConnectionSumOrderByAggregateInput = {
    intimacy?: SortOrder
    currentDepth?: SortOrder
    skipCount?: SortOrder
    answerCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumToneWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Tone | EnumToneFieldRefInput<$PrismaModel>
    in?: $Enums.Tone[] | ListEnumToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tone[] | ListEnumToneFieldRefInput<$PrismaModel>
    not?: NestedEnumToneWithAggregatesFilter<$PrismaModel> | $Enums.Tone
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumToneFilter<$PrismaModel>
    _max?: NestedEnumToneFilter<$PrismaModel>
  }

  export type EnumSensitiveStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SensitiveStatus | EnumSensitiveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SensitiveStatus[] | ListEnumSensitiveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SensitiveStatus[] | ListEnumSensitiveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSensitiveStatusWithAggregatesFilter<$PrismaModel> | $Enums.SensitiveStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSensitiveStatusFilter<$PrismaModel>
    _max?: NestedEnumSensitiveStatusFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ConnectionNullableScalarRelationFilter = {
    is?: ConnectionWhereInput | null
    isNot?: ConnectionWhereInput | null
  }

  export type ConnectionInviteCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    childId?: SortOrder
    acceptedById?: SortOrder
    connectionId?: SortOrder
    tone?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    responseChannel?: SortOrder
    createdAt?: SortOrder
    acceptedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ConnectionInviteAvgOrderByAggregateInput = {
    intimacy?: SortOrder
  }

  export type ConnectionInviteMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    childId?: SortOrder
    acceptedById?: SortOrder
    connectionId?: SortOrder
    tone?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    responseChannel?: SortOrder
    createdAt?: SortOrder
    acceptedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ConnectionInviteMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    childId?: SortOrder
    acceptedById?: SortOrder
    connectionId?: SortOrder
    tone?: SortOrder
    intimacy?: SortOrder
    cohabiting?: SortOrder
    responseChannel?: SortOrder
    createdAt?: SortOrder
    acceptedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ConnectionInviteSumOrderByAggregateInput = {
    intimacy?: SortOrder
  }

  export type EnumQuestionSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionSource | EnumQuestionSourceFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionSource[] | ListEnumQuestionSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionSource[] | ListEnumQuestionSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionSourceFilter<$PrismaModel> | $Enums.QuestionSource
  }

  export type ConnectionScalarRelationFilter = {
    is?: ConnectionWhereInput
    isNot?: ConnectionWhereInput
  }

  export type AnswerNullableScalarRelationFilter = {
    is?: AnswerWhereInput | null
    isNot?: AnswerWhereInput | null
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrder
    personTag?: SortOrder
    eraTag?: SortOrder
    source?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionAvgOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrder
    personTag?: SortOrder
    eraTag?: SortOrder
    source?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrder
    personTag?: SortOrder
    eraTag?: SortOrder
    source?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionSumOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type EnumQuestionSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionSource | EnumQuestionSourceFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionSource[] | ListEnumQuestionSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionSource[] | ListEnumQuestionSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionSourceWithAggregatesFilter<$PrismaModel> | $Enums.QuestionSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionSourceFilter<$PrismaModel>
    _max?: NestedEnumQuestionSourceFilter<$PrismaModel>
  }

  export type EnumAnswerFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerFormat | EnumAnswerFormatFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerFormat[] | ListEnumAnswerFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerFormat[] | ListEnumAnswerFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerFormatFilter<$PrismaModel> | $Enums.AnswerFormat
  }

  export type EnumAnswerOriginFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerOrigin | EnumAnswerOriginFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerOrigin[] | ListEnumAnswerOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerOrigin[] | ListEnumAnswerOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerOriginFilter<$PrismaModel> | $Enums.AnswerOrigin
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type QuestionScalarRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type AnswerCountOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    format?: SortOrder
    origin?: SortOrder
    body?: SortOrder
    mediaUrl?: SortOrder
    transcript?: SortOrder
    skipped?: SortOrder
    receivedVia?: SortOrder
    isPrivate?: SortOrder
    keywords?: SortOrder
    aiComposed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    format?: SortOrder
    origin?: SortOrder
    body?: SortOrder
    mediaUrl?: SortOrder
    transcript?: SortOrder
    skipped?: SortOrder
    receivedVia?: SortOrder
    isPrivate?: SortOrder
    aiComposed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnswerMinOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    format?: SortOrder
    origin?: SortOrder
    body?: SortOrder
    mediaUrl?: SortOrder
    transcript?: SortOrder
    skipped?: SortOrder
    receivedVia?: SortOrder
    isPrivate?: SortOrder
    aiComposed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAnswerFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerFormat | EnumAnswerFormatFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerFormat[] | ListEnumAnswerFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerFormat[] | ListEnumAnswerFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerFormatWithAggregatesFilter<$PrismaModel> | $Enums.AnswerFormat
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnswerFormatFilter<$PrismaModel>
    _max?: NestedEnumAnswerFormatFilter<$PrismaModel>
  }

  export type EnumAnswerOriginWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerOrigin | EnumAnswerOriginFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerOrigin[] | ListEnumAnswerOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerOrigin[] | ListEnumAnswerOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerOriginWithAggregatesFilter<$PrismaModel> | $Enums.AnswerOrigin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnswerOriginFilter<$PrismaModel>
    _max?: NestedEnumAnswerOriginFilter<$PrismaModel>
  }

  export type AnswerScalarRelationFilter = {
    is?: AnswerWhereInput
    isNot?: AnswerWhereInput
  }

  export type ReactionCountOrderByAggregateInput = {
    id?: SortOrder
    answerId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    comment?: SortOrder
    isFollowup?: SortOrder
    notified?: SortOrder
    createdAt?: SortOrder
  }

  export type ReactionMaxOrderByAggregateInput = {
    id?: SortOrder
    answerId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    comment?: SortOrder
    isFollowup?: SortOrder
    notified?: SortOrder
    createdAt?: SortOrder
  }

  export type ReactionMinOrderByAggregateInput = {
    id?: SortOrder
    answerId?: SortOrder
    userId?: SortOrder
    emoji?: SortOrder
    comment?: SortOrder
    isFollowup?: SortOrder
    notified?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumBookStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookStatus | EnumBookStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookStatusFilter<$PrismaModel> | $Enums.BookStatus
  }

  export type EnumBookEditionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BookEditionType | EnumBookEditionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BookEditionType[] | ListEnumBookEditionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookEditionType[] | ListEnumBookEditionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBookEditionTypeFilter<$PrismaModel> | $Enums.BookEditionType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BookEditionCountOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    rangeFrom?: SortOrder
    rangeTo?: SortOrder
    status?: SortOrder
    editionType?: SortOrder
    chapterData?: SortOrder
    pdfUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookEditionMaxOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    rangeFrom?: SortOrder
    rangeTo?: SortOrder
    status?: SortOrder
    editionType?: SortOrder
    pdfUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookEditionMinOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    rangeFrom?: SortOrder
    rangeTo?: SortOrder
    status?: SortOrder
    editionType?: SortOrder
    pdfUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumBookStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookStatus | EnumBookStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookStatusFilter<$PrismaModel>
    _max?: NestedEnumBookStatusFilter<$PrismaModel>
  }

  export type EnumBookEditionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookEditionType | EnumBookEditionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BookEditionType[] | ListEnumBookEditionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookEditionType[] | ListEnumBookEditionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBookEditionTypeWithAggregatesFilter<$PrismaModel> | $Enums.BookEditionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookEditionTypeFilter<$PrismaModel>
    _max?: NestedEnumBookEditionTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type CuratedQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrder
    personTag?: SortOrder
    eraTag?: SortOrder
    language?: SortOrder
  }

  export type CuratedQuestionAvgOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type CuratedQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrder
    personTag?: SortOrder
    eraTag?: SortOrder
    language?: SortOrder
  }

  export type CuratedQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    depth?: SortOrder
    chapterTag?: SortOrder
    personTag?: SortOrder
    eraTag?: SortOrder
    language?: SortOrder
  }

  export type CuratedQuestionSumOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type AccessLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    path?: SortOrder
    referrer?: SortOrder
    createdAt?: SortOrder
  }

  export type AccessLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    path?: SortOrder
    referrer?: SortOrder
    createdAt?: SortOrder
  }

  export type AccessLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    path?: SortOrder
    referrer?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumInquiryCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryCategory | EnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.InquiryCategory[] | ListEnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InquiryCategory[] | ListEnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInquiryCategoryNullableFilter<$PrismaModel> | $Enums.InquiryCategory | null
  }

  export type EnumInquiryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInquiryStatusFilter<$PrismaModel> | $Enums.InquiryStatus
  }

  export type InquiryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    category?: SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    category?: SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    category?: SortOrder
    message?: SortOrder
    status?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    emailSent?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumInquiryCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryCategory | EnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.InquiryCategory[] | ListEnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InquiryCategory[] | ListEnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInquiryCategoryNullableWithAggregatesFilter<$PrismaModel> | $Enums.InquiryCategory | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumInquiryCategoryNullableFilter<$PrismaModel>
    _max?: NestedEnumInquiryCategoryNullableFilter<$PrismaModel>
  }

  export type EnumInquiryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInquiryStatusWithAggregatesFilter<$PrismaModel> | $Enums.InquiryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInquiryStatusFilter<$PrismaModel>
    _max?: NestedEnumInquiryStatusFilter<$PrismaModel>
  }

  export type AdminAuditCountOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    targetIds?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminAuditMaxOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminAuditMinOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    action?: SortOrder
    createdAt?: SortOrder
  }

  export type ConnectionCreateNestedManyWithoutFromUserInput = {
    create?: XOR<ConnectionCreateWithoutFromUserInput, ConnectionUncheckedCreateWithoutFromUserInput> | ConnectionCreateWithoutFromUserInput[] | ConnectionUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutFromUserInput | ConnectionCreateOrConnectWithoutFromUserInput[]
    createMany?: ConnectionCreateManyFromUserInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type ConnectionCreateNestedManyWithoutToUserInput = {
    create?: XOR<ConnectionCreateWithoutToUserInput, ConnectionUncheckedCreateWithoutToUserInput> | ConnectionCreateWithoutToUserInput[] | ConnectionUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutToUserInput | ConnectionCreateOrConnectWithoutToUserInput[]
    createMany?: ConnectionCreateManyToUserInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type ConnectionInviteCreateNestedManyWithoutChildInput = {
    create?: XOR<ConnectionInviteCreateWithoutChildInput, ConnectionInviteUncheckedCreateWithoutChildInput> | ConnectionInviteCreateWithoutChildInput[] | ConnectionInviteUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutChildInput | ConnectionInviteCreateOrConnectWithoutChildInput[]
    createMany?: ConnectionInviteCreateManyChildInputEnvelope
    connect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
  }

  export type ConnectionInviteCreateNestedManyWithoutAcceptedByInput = {
    create?: XOR<ConnectionInviteCreateWithoutAcceptedByInput, ConnectionInviteUncheckedCreateWithoutAcceptedByInput> | ConnectionInviteCreateWithoutAcceptedByInput[] | ConnectionInviteUncheckedCreateWithoutAcceptedByInput[]
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutAcceptedByInput | ConnectionInviteCreateOrConnectWithoutAcceptedByInput[]
    createMany?: ConnectionInviteCreateManyAcceptedByInputEnvelope
    connect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ReactionCreateNestedManyWithoutUserInput = {
    create?: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput> | ReactionCreateWithoutUserInput[] | ReactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutUserInput | ReactionCreateOrConnectWithoutUserInput[]
    createMany?: ReactionCreateManyUserInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type AccessLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AccessLogCreateWithoutUserInput, AccessLogUncheckedCreateWithoutUserInput> | AccessLogCreateWithoutUserInput[] | AccessLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccessLogCreateOrConnectWithoutUserInput | AccessLogCreateOrConnectWithoutUserInput[]
    createMany?: AccessLogCreateManyUserInputEnvelope
    connect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
  }

  export type AdminCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type ConsentCreateNestedManyWithoutUserInput = {
    create?: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput> | ConsentCreateWithoutUserInput[] | ConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutUserInput | ConsentCreateOrConnectWithoutUserInput[]
    createMany?: ConsentCreateManyUserInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type ConnectionUncheckedCreateNestedManyWithoutFromUserInput = {
    create?: XOR<ConnectionCreateWithoutFromUserInput, ConnectionUncheckedCreateWithoutFromUserInput> | ConnectionCreateWithoutFromUserInput[] | ConnectionUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutFromUserInput | ConnectionCreateOrConnectWithoutFromUserInput[]
    createMany?: ConnectionCreateManyFromUserInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type ConnectionUncheckedCreateNestedManyWithoutToUserInput = {
    create?: XOR<ConnectionCreateWithoutToUserInput, ConnectionUncheckedCreateWithoutToUserInput> | ConnectionCreateWithoutToUserInput[] | ConnectionUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutToUserInput | ConnectionCreateOrConnectWithoutToUserInput[]
    createMany?: ConnectionCreateManyToUserInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type ConnectionInviteUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<ConnectionInviteCreateWithoutChildInput, ConnectionInviteUncheckedCreateWithoutChildInput> | ConnectionInviteCreateWithoutChildInput[] | ConnectionInviteUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutChildInput | ConnectionInviteCreateOrConnectWithoutChildInput[]
    createMany?: ConnectionInviteCreateManyChildInputEnvelope
    connect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
  }

  export type ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput = {
    create?: XOR<ConnectionInviteCreateWithoutAcceptedByInput, ConnectionInviteUncheckedCreateWithoutAcceptedByInput> | ConnectionInviteCreateWithoutAcceptedByInput[] | ConnectionInviteUncheckedCreateWithoutAcceptedByInput[]
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutAcceptedByInput | ConnectionInviteCreateOrConnectWithoutAcceptedByInput[]
    createMany?: ConnectionInviteCreateManyAcceptedByInputEnvelope
    connect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ReactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput> | ReactionCreateWithoutUserInput[] | ReactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutUserInput | ReactionCreateOrConnectWithoutUserInput[]
    createMany?: ReactionCreateManyUserInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type AccessLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccessLogCreateWithoutUserInput, AccessLogUncheckedCreateWithoutUserInput> | AccessLogCreateWithoutUserInput[] | AccessLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccessLogCreateOrConnectWithoutUserInput | AccessLogCreateOrConnectWithoutUserInput[]
    createMany?: AccessLogCreateManyUserInputEnvelope
    connect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
  }

  export type AdminUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    connect?: AdminWhereUniqueInput
  }

  export type ConsentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput> | ConsentCreateWithoutUserInput[] | ConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutUserInput | ConsentCreateOrConnectWithoutUserInput[]
    createMany?: ConsentCreateManyUserInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ConnectionUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<ConnectionCreateWithoutFromUserInput, ConnectionUncheckedCreateWithoutFromUserInput> | ConnectionCreateWithoutFromUserInput[] | ConnectionUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutFromUserInput | ConnectionCreateOrConnectWithoutFromUserInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutFromUserInput | ConnectionUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: ConnectionCreateManyFromUserInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutFromUserInput | ConnectionUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutFromUserInput | ConnectionUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type ConnectionUpdateManyWithoutToUserNestedInput = {
    create?: XOR<ConnectionCreateWithoutToUserInput, ConnectionUncheckedCreateWithoutToUserInput> | ConnectionCreateWithoutToUserInput[] | ConnectionUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutToUserInput | ConnectionCreateOrConnectWithoutToUserInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutToUserInput | ConnectionUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: ConnectionCreateManyToUserInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutToUserInput | ConnectionUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutToUserInput | ConnectionUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type ConnectionInviteUpdateManyWithoutChildNestedInput = {
    create?: XOR<ConnectionInviteCreateWithoutChildInput, ConnectionInviteUncheckedCreateWithoutChildInput> | ConnectionInviteCreateWithoutChildInput[] | ConnectionInviteUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutChildInput | ConnectionInviteCreateOrConnectWithoutChildInput[]
    upsert?: ConnectionInviteUpsertWithWhereUniqueWithoutChildInput | ConnectionInviteUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ConnectionInviteCreateManyChildInputEnvelope
    set?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    disconnect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    delete?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    connect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    update?: ConnectionInviteUpdateWithWhereUniqueWithoutChildInput | ConnectionInviteUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ConnectionInviteUpdateManyWithWhereWithoutChildInput | ConnectionInviteUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ConnectionInviteScalarWhereInput | ConnectionInviteScalarWhereInput[]
  }

  export type ConnectionInviteUpdateManyWithoutAcceptedByNestedInput = {
    create?: XOR<ConnectionInviteCreateWithoutAcceptedByInput, ConnectionInviteUncheckedCreateWithoutAcceptedByInput> | ConnectionInviteCreateWithoutAcceptedByInput[] | ConnectionInviteUncheckedCreateWithoutAcceptedByInput[]
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutAcceptedByInput | ConnectionInviteCreateOrConnectWithoutAcceptedByInput[]
    upsert?: ConnectionInviteUpsertWithWhereUniqueWithoutAcceptedByInput | ConnectionInviteUpsertWithWhereUniqueWithoutAcceptedByInput[]
    createMany?: ConnectionInviteCreateManyAcceptedByInputEnvelope
    set?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    disconnect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    delete?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    connect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    update?: ConnectionInviteUpdateWithWhereUniqueWithoutAcceptedByInput | ConnectionInviteUpdateWithWhereUniqueWithoutAcceptedByInput[]
    updateMany?: ConnectionInviteUpdateManyWithWhereWithoutAcceptedByInput | ConnectionInviteUpdateManyWithWhereWithoutAcceptedByInput[]
    deleteMany?: ConnectionInviteScalarWhereInput | ConnectionInviteScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ReactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput> | ReactionCreateWithoutUserInput[] | ReactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutUserInput | ReactionCreateOrConnectWithoutUserInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutUserInput | ReactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReactionCreateManyUserInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutUserInput | ReactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutUserInput | ReactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type AccessLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccessLogCreateWithoutUserInput, AccessLogUncheckedCreateWithoutUserInput> | AccessLogCreateWithoutUserInput[] | AccessLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccessLogCreateOrConnectWithoutUserInput | AccessLogCreateOrConnectWithoutUserInput[]
    upsert?: AccessLogUpsertWithWhereUniqueWithoutUserInput | AccessLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccessLogCreateManyUserInputEnvelope
    set?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    disconnect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    delete?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    connect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    update?: AccessLogUpdateWithWhereUniqueWithoutUserInput | AccessLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccessLogUpdateManyWithWhereWithoutUserInput | AccessLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccessLogScalarWhereInput | AccessLogScalarWhereInput[]
  }

  export type AdminUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type ConsentUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput> | ConsentCreateWithoutUserInput[] | ConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutUserInput | ConsentCreateOrConnectWithoutUserInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutUserInput | ConsentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConsentCreateManyUserInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutUserInput | ConsentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutUserInput | ConsentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type ConnectionUncheckedUpdateManyWithoutFromUserNestedInput = {
    create?: XOR<ConnectionCreateWithoutFromUserInput, ConnectionUncheckedCreateWithoutFromUserInput> | ConnectionCreateWithoutFromUserInput[] | ConnectionUncheckedCreateWithoutFromUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutFromUserInput | ConnectionCreateOrConnectWithoutFromUserInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutFromUserInput | ConnectionUpsertWithWhereUniqueWithoutFromUserInput[]
    createMany?: ConnectionCreateManyFromUserInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutFromUserInput | ConnectionUpdateWithWhereUniqueWithoutFromUserInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutFromUserInput | ConnectionUpdateManyWithWhereWithoutFromUserInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type ConnectionUncheckedUpdateManyWithoutToUserNestedInput = {
    create?: XOR<ConnectionCreateWithoutToUserInput, ConnectionUncheckedCreateWithoutToUserInput> | ConnectionCreateWithoutToUserInput[] | ConnectionUncheckedCreateWithoutToUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutToUserInput | ConnectionCreateOrConnectWithoutToUserInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutToUserInput | ConnectionUpsertWithWhereUniqueWithoutToUserInput[]
    createMany?: ConnectionCreateManyToUserInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutToUserInput | ConnectionUpdateWithWhereUniqueWithoutToUserInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutToUserInput | ConnectionUpdateManyWithWhereWithoutToUserInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<ConnectionInviteCreateWithoutChildInput, ConnectionInviteUncheckedCreateWithoutChildInput> | ConnectionInviteCreateWithoutChildInput[] | ConnectionInviteUncheckedCreateWithoutChildInput[]
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutChildInput | ConnectionInviteCreateOrConnectWithoutChildInput[]
    upsert?: ConnectionInviteUpsertWithWhereUniqueWithoutChildInput | ConnectionInviteUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: ConnectionInviteCreateManyChildInputEnvelope
    set?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    disconnect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    delete?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    connect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    update?: ConnectionInviteUpdateWithWhereUniqueWithoutChildInput | ConnectionInviteUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: ConnectionInviteUpdateManyWithWhereWithoutChildInput | ConnectionInviteUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: ConnectionInviteScalarWhereInput | ConnectionInviteScalarWhereInput[]
  }

  export type ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput = {
    create?: XOR<ConnectionInviteCreateWithoutAcceptedByInput, ConnectionInviteUncheckedCreateWithoutAcceptedByInput> | ConnectionInviteCreateWithoutAcceptedByInput[] | ConnectionInviteUncheckedCreateWithoutAcceptedByInput[]
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutAcceptedByInput | ConnectionInviteCreateOrConnectWithoutAcceptedByInput[]
    upsert?: ConnectionInviteUpsertWithWhereUniqueWithoutAcceptedByInput | ConnectionInviteUpsertWithWhereUniqueWithoutAcceptedByInput[]
    createMany?: ConnectionInviteCreateManyAcceptedByInputEnvelope
    set?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    disconnect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    delete?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    connect?: ConnectionInviteWhereUniqueInput | ConnectionInviteWhereUniqueInput[]
    update?: ConnectionInviteUpdateWithWhereUniqueWithoutAcceptedByInput | ConnectionInviteUpdateWithWhereUniqueWithoutAcceptedByInput[]
    updateMany?: ConnectionInviteUpdateManyWithWhereWithoutAcceptedByInput | ConnectionInviteUpdateManyWithWhereWithoutAcceptedByInput[]
    deleteMany?: ConnectionInviteScalarWhereInput | ConnectionInviteScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ReactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput> | ReactionCreateWithoutUserInput[] | ReactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutUserInput | ReactionCreateOrConnectWithoutUserInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutUserInput | ReactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReactionCreateManyUserInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutUserInput | ReactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutUserInput | ReactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type AccessLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccessLogCreateWithoutUserInput, AccessLogUncheckedCreateWithoutUserInput> | AccessLogCreateWithoutUserInput[] | AccessLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccessLogCreateOrConnectWithoutUserInput | AccessLogCreateOrConnectWithoutUserInput[]
    upsert?: AccessLogUpsertWithWhereUniqueWithoutUserInput | AccessLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccessLogCreateManyUserInputEnvelope
    set?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    disconnect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    delete?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    connect?: AccessLogWhereUniqueInput | AccessLogWhereUniqueInput[]
    update?: AccessLogUpdateWithWhereUniqueWithoutUserInput | AccessLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccessLogUpdateManyWithWhereWithoutUserInput | AccessLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccessLogScalarWhereInput | AccessLogScalarWhereInput[]
  }

  export type AdminUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    connectOrCreate?: AdminCreateOrConnectWithoutUserInput
    upsert?: AdminUpsertWithoutUserInput
    disconnect?: AdminWhereInput | boolean
    delete?: AdminWhereInput | boolean
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutUserInput, AdminUpdateWithoutUserInput>, AdminUncheckedUpdateWithoutUserInput>
  }

  export type ConsentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput> | ConsentCreateWithoutUserInput[] | ConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutUserInput | ConsentCreateOrConnectWithoutUserInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutUserInput | ConsentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConsentCreateManyUserInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutUserInput | ConsentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutUserInput | ConsentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutConsentsInput = {
    create?: XOR<UserCreateWithoutConsentsInput, UserUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsentsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumConsentTypeFieldUpdateOperationsInput = {
    set?: $Enums.ConsentType
  }

  export type UserUpdateOneRequiredWithoutConsentsNestedInput = {
    create?: XOR<UserCreateWithoutConsentsInput, UserUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConsentsInput
    upsert?: UserUpsertWithoutConsentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConsentsInput, UserUpdateWithoutConsentsInput>, UserUncheckedUpdateWithoutConsentsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutSentConnectionsInput = {
    create?: XOR<UserCreateWithoutSentConnectionsInput, UserUncheckedCreateWithoutSentConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentConnectionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedConnectionsInput = {
    create?: XOR<UserCreateWithoutReceivedConnectionsInput, UserUncheckedCreateWithoutReceivedConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedConnectionsInput
    connect?: UserWhereUniqueInput
  }

  export type QuestionCreateNestedManyWithoutConnectionInput = {
    create?: XOR<QuestionCreateWithoutConnectionInput, QuestionUncheckedCreateWithoutConnectionInput> | QuestionCreateWithoutConnectionInput[] | QuestionUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutConnectionInput | QuestionCreateOrConnectWithoutConnectionInput[]
    createMany?: QuestionCreateManyConnectionInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type BookEditionCreateNestedManyWithoutConnectionInput = {
    create?: XOR<BookEditionCreateWithoutConnectionInput, BookEditionUncheckedCreateWithoutConnectionInput> | BookEditionCreateWithoutConnectionInput[] | BookEditionUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: BookEditionCreateOrConnectWithoutConnectionInput | BookEditionCreateOrConnectWithoutConnectionInput[]
    createMany?: BookEditionCreateManyConnectionInputEnvelope
    connect?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
  }

  export type ConnectionInviteCreateNestedOneWithoutConnectionInput = {
    create?: XOR<ConnectionInviteCreateWithoutConnectionInput, ConnectionInviteUncheckedCreateWithoutConnectionInput>
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutConnectionInput
    connect?: ConnectionInviteWhereUniqueInput
  }

  export type QuestionUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<QuestionCreateWithoutConnectionInput, QuestionUncheckedCreateWithoutConnectionInput> | QuestionCreateWithoutConnectionInput[] | QuestionUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutConnectionInput | QuestionCreateOrConnectWithoutConnectionInput[]
    createMany?: QuestionCreateManyConnectionInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type BookEditionUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<BookEditionCreateWithoutConnectionInput, BookEditionUncheckedCreateWithoutConnectionInput> | BookEditionCreateWithoutConnectionInput[] | BookEditionUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: BookEditionCreateOrConnectWithoutConnectionInput | BookEditionCreateOrConnectWithoutConnectionInput[]
    createMany?: BookEditionCreateManyConnectionInputEnvelope
    connect?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
  }

  export type ConnectionInviteUncheckedCreateNestedOneWithoutConnectionInput = {
    create?: XOR<ConnectionInviteCreateWithoutConnectionInput, ConnectionInviteUncheckedCreateWithoutConnectionInput>
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutConnectionInput
    connect?: ConnectionInviteWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumToneFieldUpdateOperationsInput = {
    set?: $Enums.Tone
  }

  export type EnumSensitiveStatusFieldUpdateOperationsInput = {
    set?: $Enums.SensitiveStatus
  }

  export type UserUpdateOneRequiredWithoutSentConnectionsNestedInput = {
    create?: XOR<UserCreateWithoutSentConnectionsInput, UserUncheckedCreateWithoutSentConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentConnectionsInput
    upsert?: UserUpsertWithoutSentConnectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentConnectionsInput, UserUpdateWithoutSentConnectionsInput>, UserUncheckedUpdateWithoutSentConnectionsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedConnectionsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedConnectionsInput, UserUncheckedCreateWithoutReceivedConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedConnectionsInput
    upsert?: UserUpsertWithoutReceivedConnectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedConnectionsInput, UserUpdateWithoutReceivedConnectionsInput>, UserUncheckedUpdateWithoutReceivedConnectionsInput>
  }

  export type QuestionUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<QuestionCreateWithoutConnectionInput, QuestionUncheckedCreateWithoutConnectionInput> | QuestionCreateWithoutConnectionInput[] | QuestionUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutConnectionInput | QuestionCreateOrConnectWithoutConnectionInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutConnectionInput | QuestionUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: QuestionCreateManyConnectionInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutConnectionInput | QuestionUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutConnectionInput | QuestionUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type BookEditionUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<BookEditionCreateWithoutConnectionInput, BookEditionUncheckedCreateWithoutConnectionInput> | BookEditionCreateWithoutConnectionInput[] | BookEditionUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: BookEditionCreateOrConnectWithoutConnectionInput | BookEditionCreateOrConnectWithoutConnectionInput[]
    upsert?: BookEditionUpsertWithWhereUniqueWithoutConnectionInput | BookEditionUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: BookEditionCreateManyConnectionInputEnvelope
    set?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
    disconnect?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
    delete?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
    connect?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
    update?: BookEditionUpdateWithWhereUniqueWithoutConnectionInput | BookEditionUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: BookEditionUpdateManyWithWhereWithoutConnectionInput | BookEditionUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: BookEditionScalarWhereInput | BookEditionScalarWhereInput[]
  }

  export type ConnectionInviteUpdateOneWithoutConnectionNestedInput = {
    create?: XOR<ConnectionInviteCreateWithoutConnectionInput, ConnectionInviteUncheckedCreateWithoutConnectionInput>
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutConnectionInput
    upsert?: ConnectionInviteUpsertWithoutConnectionInput
    disconnect?: ConnectionInviteWhereInput | boolean
    delete?: ConnectionInviteWhereInput | boolean
    connect?: ConnectionInviteWhereUniqueInput
    update?: XOR<XOR<ConnectionInviteUpdateToOneWithWhereWithoutConnectionInput, ConnectionInviteUpdateWithoutConnectionInput>, ConnectionInviteUncheckedUpdateWithoutConnectionInput>
  }

  export type QuestionUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<QuestionCreateWithoutConnectionInput, QuestionUncheckedCreateWithoutConnectionInput> | QuestionCreateWithoutConnectionInput[] | QuestionUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutConnectionInput | QuestionCreateOrConnectWithoutConnectionInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutConnectionInput | QuestionUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: QuestionCreateManyConnectionInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutConnectionInput | QuestionUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutConnectionInput | QuestionUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type BookEditionUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<BookEditionCreateWithoutConnectionInput, BookEditionUncheckedCreateWithoutConnectionInput> | BookEditionCreateWithoutConnectionInput[] | BookEditionUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: BookEditionCreateOrConnectWithoutConnectionInput | BookEditionCreateOrConnectWithoutConnectionInput[]
    upsert?: BookEditionUpsertWithWhereUniqueWithoutConnectionInput | BookEditionUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: BookEditionCreateManyConnectionInputEnvelope
    set?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
    disconnect?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
    delete?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
    connect?: BookEditionWhereUniqueInput | BookEditionWhereUniqueInput[]
    update?: BookEditionUpdateWithWhereUniqueWithoutConnectionInput | BookEditionUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: BookEditionUpdateManyWithWhereWithoutConnectionInput | BookEditionUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: BookEditionScalarWhereInput | BookEditionScalarWhereInput[]
  }

  export type ConnectionInviteUncheckedUpdateOneWithoutConnectionNestedInput = {
    create?: XOR<ConnectionInviteCreateWithoutConnectionInput, ConnectionInviteUncheckedCreateWithoutConnectionInput>
    connectOrCreate?: ConnectionInviteCreateOrConnectWithoutConnectionInput
    upsert?: ConnectionInviteUpsertWithoutConnectionInput
    disconnect?: ConnectionInviteWhereInput | boolean
    delete?: ConnectionInviteWhereInput | boolean
    connect?: ConnectionInviteWhereUniqueInput
    update?: XOR<XOR<ConnectionInviteUpdateToOneWithWhereWithoutConnectionInput, ConnectionInviteUpdateWithoutConnectionInput>, ConnectionInviteUncheckedUpdateWithoutConnectionInput>
  }

  export type UserCreateNestedOneWithoutChildInvitesInput = {
    create?: XOR<UserCreateWithoutChildInvitesInput, UserUncheckedCreateWithoutChildInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChildInvitesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAcceptedInvitesInput = {
    create?: XOR<UserCreateWithoutAcceptedInvitesInput, UserUncheckedCreateWithoutAcceptedInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAcceptedInvitesInput
    connect?: UserWhereUniqueInput
  }

  export type ConnectionCreateNestedOneWithoutInviteInput = {
    create?: XOR<ConnectionCreateWithoutInviteInput, ConnectionUncheckedCreateWithoutInviteInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutInviteInput
    connect?: ConnectionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutChildInvitesNestedInput = {
    create?: XOR<UserCreateWithoutChildInvitesInput, UserUncheckedCreateWithoutChildInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutChildInvitesInput
    upsert?: UserUpsertWithoutChildInvitesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChildInvitesInput, UserUpdateWithoutChildInvitesInput>, UserUncheckedUpdateWithoutChildInvitesInput>
  }

  export type UserUpdateOneWithoutAcceptedInvitesNestedInput = {
    create?: XOR<UserCreateWithoutAcceptedInvitesInput, UserUncheckedCreateWithoutAcceptedInvitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAcceptedInvitesInput
    upsert?: UserUpsertWithoutAcceptedInvitesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAcceptedInvitesInput, UserUpdateWithoutAcceptedInvitesInput>, UserUncheckedUpdateWithoutAcceptedInvitesInput>
  }

  export type ConnectionUpdateOneWithoutInviteNestedInput = {
    create?: XOR<ConnectionCreateWithoutInviteInput, ConnectionUncheckedCreateWithoutInviteInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutInviteInput
    upsert?: ConnectionUpsertWithoutInviteInput
    disconnect?: ConnectionWhereInput | boolean
    delete?: ConnectionWhereInput | boolean
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutInviteInput, ConnectionUpdateWithoutInviteInput>, ConnectionUncheckedUpdateWithoutInviteInput>
  }

  export type ConnectionCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<ConnectionCreateWithoutQuestionsInput, ConnectionUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutQuestionsInput
    connect?: ConnectionWhereUniqueInput
  }

  export type AnswerCreateNestedOneWithoutQuestionInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput
    connect?: AnswerWhereUniqueInput
  }

  export type AnswerUncheckedCreateNestedOneWithoutQuestionInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput
    connect?: AnswerWhereUniqueInput
  }

  export type EnumQuestionSourceFieldUpdateOperationsInput = {
    set?: $Enums.QuestionSource
  }

  export type ConnectionUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<ConnectionCreateWithoutQuestionsInput, ConnectionUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutQuestionsInput
    upsert?: ConnectionUpsertWithoutQuestionsInput
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutQuestionsInput, ConnectionUpdateWithoutQuestionsInput>, ConnectionUncheckedUpdateWithoutQuestionsInput>
  }

  export type AnswerUpdateOneWithoutQuestionNestedInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput
    upsert?: AnswerUpsertWithoutQuestionInput
    disconnect?: AnswerWhereInput | boolean
    delete?: AnswerWhereInput | boolean
    connect?: AnswerWhereUniqueInput
    update?: XOR<XOR<AnswerUpdateToOneWithWhereWithoutQuestionInput, AnswerUpdateWithoutQuestionInput>, AnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type AnswerUncheckedUpdateOneWithoutQuestionNestedInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput
    upsert?: AnswerUpsertWithoutQuestionInput
    disconnect?: AnswerWhereInput | boolean
    delete?: AnswerWhereInput | boolean
    connect?: AnswerWhereUniqueInput
    update?: XOR<XOR<AnswerUpdateToOneWithWhereWithoutQuestionInput, AnswerUpdateWithoutQuestionInput>, AnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type AnswerCreatekeywordsInput = {
    set: string[]
  }

  export type QuestionCreateNestedOneWithoutAnswerInput = {
    create?: XOR<QuestionCreateWithoutAnswerInput, QuestionUncheckedCreateWithoutAnswerInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswerInput
    connect?: QuestionWhereUniqueInput
  }

  export type ReactionCreateNestedManyWithoutAnswerInput = {
    create?: XOR<ReactionCreateWithoutAnswerInput, ReactionUncheckedCreateWithoutAnswerInput> | ReactionCreateWithoutAnswerInput[] | ReactionUncheckedCreateWithoutAnswerInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutAnswerInput | ReactionCreateOrConnectWithoutAnswerInput[]
    createMany?: ReactionCreateManyAnswerInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type ReactionUncheckedCreateNestedManyWithoutAnswerInput = {
    create?: XOR<ReactionCreateWithoutAnswerInput, ReactionUncheckedCreateWithoutAnswerInput> | ReactionCreateWithoutAnswerInput[] | ReactionUncheckedCreateWithoutAnswerInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutAnswerInput | ReactionCreateOrConnectWithoutAnswerInput[]
    createMany?: ReactionCreateManyAnswerInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type EnumAnswerFormatFieldUpdateOperationsInput = {
    set?: $Enums.AnswerFormat
  }

  export type EnumAnswerOriginFieldUpdateOperationsInput = {
    set?: $Enums.AnswerOrigin
  }

  export type AnswerUpdatekeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type QuestionUpdateOneRequiredWithoutAnswerNestedInput = {
    create?: XOR<QuestionCreateWithoutAnswerInput, QuestionUncheckedCreateWithoutAnswerInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswerInput
    upsert?: QuestionUpsertWithoutAnswerInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutAnswerInput, QuestionUpdateWithoutAnswerInput>, QuestionUncheckedUpdateWithoutAnswerInput>
  }

  export type ReactionUpdateManyWithoutAnswerNestedInput = {
    create?: XOR<ReactionCreateWithoutAnswerInput, ReactionUncheckedCreateWithoutAnswerInput> | ReactionCreateWithoutAnswerInput[] | ReactionUncheckedCreateWithoutAnswerInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutAnswerInput | ReactionCreateOrConnectWithoutAnswerInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutAnswerInput | ReactionUpsertWithWhereUniqueWithoutAnswerInput[]
    createMany?: ReactionCreateManyAnswerInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutAnswerInput | ReactionUpdateWithWhereUniqueWithoutAnswerInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutAnswerInput | ReactionUpdateManyWithWhereWithoutAnswerInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type ReactionUncheckedUpdateManyWithoutAnswerNestedInput = {
    create?: XOR<ReactionCreateWithoutAnswerInput, ReactionUncheckedCreateWithoutAnswerInput> | ReactionCreateWithoutAnswerInput[] | ReactionUncheckedCreateWithoutAnswerInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutAnswerInput | ReactionCreateOrConnectWithoutAnswerInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutAnswerInput | ReactionUpsertWithWhereUniqueWithoutAnswerInput[]
    createMany?: ReactionCreateManyAnswerInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutAnswerInput | ReactionUpdateWithWhereUniqueWithoutAnswerInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutAnswerInput | ReactionUpdateManyWithWhereWithoutAnswerInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type AnswerCreateNestedOneWithoutReactionsInput = {
    create?: XOR<AnswerCreateWithoutReactionsInput, AnswerUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: AnswerCreateOrConnectWithoutReactionsInput
    connect?: AnswerWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReactionsInput = {
    create?: XOR<UserCreateWithoutReactionsInput, UserUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReactionsInput
    connect?: UserWhereUniqueInput
  }

  export type AnswerUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: XOR<AnswerCreateWithoutReactionsInput, AnswerUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: AnswerCreateOrConnectWithoutReactionsInput
    upsert?: AnswerUpsertWithoutReactionsInput
    connect?: AnswerWhereUniqueInput
    update?: XOR<XOR<AnswerUpdateToOneWithWhereWithoutReactionsInput, AnswerUpdateWithoutReactionsInput>, AnswerUncheckedUpdateWithoutReactionsInput>
  }

  export type UserUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: XOR<UserCreateWithoutReactionsInput, UserUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReactionsInput
    upsert?: UserUpsertWithoutReactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReactionsInput, UserUpdateWithoutReactionsInput>, UserUncheckedUpdateWithoutReactionsInput>
  }

  export type ConnectionCreateNestedOneWithoutBookEditionsInput = {
    create?: XOR<ConnectionCreateWithoutBookEditionsInput, ConnectionUncheckedCreateWithoutBookEditionsInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutBookEditionsInput
    connect?: ConnectionWhereUniqueInput
  }

  export type EnumBookStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookStatus
  }

  export type EnumBookEditionTypeFieldUpdateOperationsInput = {
    set?: $Enums.BookEditionType
  }

  export type ConnectionUpdateOneRequiredWithoutBookEditionsNestedInput = {
    create?: XOR<ConnectionCreateWithoutBookEditionsInput, ConnectionUncheckedCreateWithoutBookEditionsInput>
    connectOrCreate?: ConnectionCreateOrConnectWithoutBookEditionsInput
    upsert?: ConnectionUpsertWithoutBookEditionsInput
    connect?: ConnectionWhereUniqueInput
    update?: XOR<XOR<ConnectionUpdateToOneWithWhereWithoutBookEditionsInput, ConnectionUpdateWithoutBookEditionsInput>, ConnectionUncheckedUpdateWithoutBookEditionsInput>
  }

  export type UserCreateNestedOneWithoutAccessLogsInput = {
    create?: XOR<UserCreateWithoutAccessLogsInput, UserUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccessLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAccessLogsNestedInput = {
    create?: XOR<UserCreateWithoutAccessLogsInput, UserUncheckedCreateWithoutAccessLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccessLogsInput
    upsert?: UserUpsertWithoutAccessLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccessLogsInput, UserUpdateWithoutAccessLogsInput>, UserUncheckedUpdateWithoutAccessLogsInput>
  }

  export type UserCreateNestedOneWithoutAdminInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAdminNestedInput = {
    create?: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminInput
    upsert?: UserUpsertWithoutAdminInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminInput, UserUpdateWithoutAdminInput>, UserUncheckedUpdateWithoutAdminInput>
  }

  export type NullableEnumInquiryCategoryFieldUpdateOperationsInput = {
    set?: $Enums.InquiryCategory | null
  }

  export type EnumInquiryStatusFieldUpdateOperationsInput = {
    set?: $Enums.InquiryStatus
  }

  export type AdminAuditCreatetargetIdsInput = {
    set: string[]
  }

  export type AdminAuditUpdatetargetIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumConsentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentType | EnumConsentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentTypeFilter<$PrismaModel> | $Enums.ConsentType
  }

  export type NestedEnumConsentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentType | EnumConsentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentType[] | ListEnumConsentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConsentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsentTypeFilter<$PrismaModel>
    _max?: NestedEnumConsentTypeFilter<$PrismaModel>
  }

  export type NestedEnumToneFilter<$PrismaModel = never> = {
    equals?: $Enums.Tone | EnumToneFieldRefInput<$PrismaModel>
    in?: $Enums.Tone[] | ListEnumToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tone[] | ListEnumToneFieldRefInput<$PrismaModel>
    not?: NestedEnumToneFilter<$PrismaModel> | $Enums.Tone
  }

  export type NestedEnumSensitiveStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SensitiveStatus | EnumSensitiveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SensitiveStatus[] | ListEnumSensitiveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SensitiveStatus[] | ListEnumSensitiveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSensitiveStatusFilter<$PrismaModel> | $Enums.SensitiveStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumToneWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Tone | EnumToneFieldRefInput<$PrismaModel>
    in?: $Enums.Tone[] | ListEnumToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tone[] | ListEnumToneFieldRefInput<$PrismaModel>
    not?: NestedEnumToneWithAggregatesFilter<$PrismaModel> | $Enums.Tone
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumToneFilter<$PrismaModel>
    _max?: NestedEnumToneFilter<$PrismaModel>
  }

  export type NestedEnumSensitiveStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SensitiveStatus | EnumSensitiveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SensitiveStatus[] | ListEnumSensitiveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SensitiveStatus[] | ListEnumSensitiveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSensitiveStatusWithAggregatesFilter<$PrismaModel> | $Enums.SensitiveStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSensitiveStatusFilter<$PrismaModel>
    _max?: NestedEnumSensitiveStatusFilter<$PrismaModel>
  }

  export type NestedEnumQuestionSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionSource | EnumQuestionSourceFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionSource[] | ListEnumQuestionSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionSource[] | ListEnumQuestionSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionSourceFilter<$PrismaModel> | $Enums.QuestionSource
  }

  export type NestedEnumQuestionSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionSource | EnumQuestionSourceFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionSource[] | ListEnumQuestionSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionSource[] | ListEnumQuestionSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionSourceWithAggregatesFilter<$PrismaModel> | $Enums.QuestionSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionSourceFilter<$PrismaModel>
    _max?: NestedEnumQuestionSourceFilter<$PrismaModel>
  }

  export type NestedEnumAnswerFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerFormat | EnumAnswerFormatFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerFormat[] | ListEnumAnswerFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerFormat[] | ListEnumAnswerFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerFormatFilter<$PrismaModel> | $Enums.AnswerFormat
  }

  export type NestedEnumAnswerOriginFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerOrigin | EnumAnswerOriginFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerOrigin[] | ListEnumAnswerOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerOrigin[] | ListEnumAnswerOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerOriginFilter<$PrismaModel> | $Enums.AnswerOrigin
  }

  export type NestedEnumAnswerFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerFormat | EnumAnswerFormatFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerFormat[] | ListEnumAnswerFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerFormat[] | ListEnumAnswerFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerFormatWithAggregatesFilter<$PrismaModel> | $Enums.AnswerFormat
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnswerFormatFilter<$PrismaModel>
    _max?: NestedEnumAnswerFormatFilter<$PrismaModel>
  }

  export type NestedEnumAnswerOriginWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnswerOrigin | EnumAnswerOriginFieldRefInput<$PrismaModel>
    in?: $Enums.AnswerOrigin[] | ListEnumAnswerOriginFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnswerOrigin[] | ListEnumAnswerOriginFieldRefInput<$PrismaModel>
    not?: NestedEnumAnswerOriginWithAggregatesFilter<$PrismaModel> | $Enums.AnswerOrigin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnswerOriginFilter<$PrismaModel>
    _max?: NestedEnumAnswerOriginFilter<$PrismaModel>
  }

  export type NestedEnumBookStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookStatus | EnumBookStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookStatusFilter<$PrismaModel> | $Enums.BookStatus
  }

  export type NestedEnumBookEditionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BookEditionType | EnumBookEditionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BookEditionType[] | ListEnumBookEditionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookEditionType[] | ListEnumBookEditionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBookEditionTypeFilter<$PrismaModel> | $Enums.BookEditionType
  }

  export type NestedEnumBookStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookStatus | EnumBookStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookStatus[] | ListEnumBookStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookStatusFilter<$PrismaModel>
    _max?: NestedEnumBookStatusFilter<$PrismaModel>
  }

  export type NestedEnumBookEditionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookEditionType | EnumBookEditionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BookEditionType[] | ListEnumBookEditionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookEditionType[] | ListEnumBookEditionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBookEditionTypeWithAggregatesFilter<$PrismaModel> | $Enums.BookEditionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookEditionTypeFilter<$PrismaModel>
    _max?: NestedEnumBookEditionTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumInquiryCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryCategory | EnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.InquiryCategory[] | ListEnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InquiryCategory[] | ListEnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInquiryCategoryNullableFilter<$PrismaModel> | $Enums.InquiryCategory | null
  }

  export type NestedEnumInquiryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInquiryStatusFilter<$PrismaModel> | $Enums.InquiryStatus
  }

  export type NestedEnumInquiryCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryCategory | EnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.InquiryCategory[] | ListEnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InquiryCategory[] | ListEnumInquiryCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInquiryCategoryNullableWithAggregatesFilter<$PrismaModel> | $Enums.InquiryCategory | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumInquiryCategoryNullableFilter<$PrismaModel>
    _max?: NestedEnumInquiryCategoryNullableFilter<$PrismaModel>
  }

  export type NestedEnumInquiryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInquiryStatusWithAggregatesFilter<$PrismaModel> | $Enums.InquiryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInquiryStatusFilter<$PrismaModel>
    _max?: NestedEnumInquiryStatusFilter<$PrismaModel>
  }

  export type ConnectionCreateWithoutFromUserInput = {
    id?: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    toUser: UserCreateNestedOneWithoutReceivedConnectionsInput
    questions?: QuestionCreateNestedManyWithoutConnectionInput
    bookEditions?: BookEditionCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutFromUserInput = {
    id?: string
    toUserId: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutConnectionInput
    bookEditions?: BookEditionUncheckedCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteUncheckedCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutFromUserInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutFromUserInput, ConnectionUncheckedCreateWithoutFromUserInput>
  }

  export type ConnectionCreateManyFromUserInputEnvelope = {
    data: ConnectionCreateManyFromUserInput | ConnectionCreateManyFromUserInput[]
    skipDuplicates?: boolean
  }

  export type ConnectionCreateWithoutToUserInput = {
    id?: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutSentConnectionsInput
    questions?: QuestionCreateNestedManyWithoutConnectionInput
    bookEditions?: BookEditionCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutToUserInput = {
    id?: string
    fromUserId: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutConnectionInput
    bookEditions?: BookEditionUncheckedCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteUncheckedCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutToUserInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutToUserInput, ConnectionUncheckedCreateWithoutToUserInput>
  }

  export type ConnectionCreateManyToUserInputEnvelope = {
    data: ConnectionCreateManyToUserInput | ConnectionCreateManyToUserInput[]
    skipDuplicates?: boolean
  }

  export type ConnectionInviteCreateWithoutChildInput = {
    id?: string
    code: string
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
    acceptedBy?: UserCreateNestedOneWithoutAcceptedInvitesInput
    connection?: ConnectionCreateNestedOneWithoutInviteInput
  }

  export type ConnectionInviteUncheckedCreateWithoutChildInput = {
    id?: string
    code: string
    acceptedById?: string | null
    connectionId?: string | null
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConnectionInviteCreateOrConnectWithoutChildInput = {
    where: ConnectionInviteWhereUniqueInput
    create: XOR<ConnectionInviteCreateWithoutChildInput, ConnectionInviteUncheckedCreateWithoutChildInput>
  }

  export type ConnectionInviteCreateManyChildInputEnvelope = {
    data: ConnectionInviteCreateManyChildInput | ConnectionInviteCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type ConnectionInviteCreateWithoutAcceptedByInput = {
    id?: string
    code: string
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
    child: UserCreateNestedOneWithoutChildInvitesInput
    connection?: ConnectionCreateNestedOneWithoutInviteInput
  }

  export type ConnectionInviteUncheckedCreateWithoutAcceptedByInput = {
    id?: string
    code: string
    childId: string
    connectionId?: string | null
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConnectionInviteCreateOrConnectWithoutAcceptedByInput = {
    where: ConnectionInviteWhereUniqueInput
    create: XOR<ConnectionInviteCreateWithoutAcceptedByInput, ConnectionInviteUncheckedCreateWithoutAcceptedByInput>
  }

  export type ConnectionInviteCreateManyAcceptedByInputEnvelope = {
    data: ConnectionInviteCreateManyAcceptedByInput | ConnectionInviteCreateManyAcceptedByInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReactionCreateWithoutUserInput = {
    id?: string
    emoji?: string | null
    comment?: string | null
    isFollowup?: boolean
    notified?: boolean
    createdAt?: Date | string
    answer: AnswerCreateNestedOneWithoutReactionsInput
  }

  export type ReactionUncheckedCreateWithoutUserInput = {
    id?: string
    answerId: string
    emoji?: string | null
    comment?: string | null
    isFollowup?: boolean
    notified?: boolean
    createdAt?: Date | string
  }

  export type ReactionCreateOrConnectWithoutUserInput = {
    where: ReactionWhereUniqueInput
    create: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput>
  }

  export type ReactionCreateManyUserInputEnvelope = {
    data: ReactionCreateManyUserInput | ReactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccessLogCreateWithoutUserInput = {
    id?: string
    email?: string | null
    name?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    path?: string | null
    referrer?: string | null
    createdAt?: Date | string
  }

  export type AccessLogUncheckedCreateWithoutUserInput = {
    id?: string
    email?: string | null
    name?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    path?: string | null
    referrer?: string | null
    createdAt?: Date | string
  }

  export type AccessLogCreateOrConnectWithoutUserInput = {
    where: AccessLogWhereUniqueInput
    create: XOR<AccessLogCreateWithoutUserInput, AccessLogUncheckedCreateWithoutUserInput>
  }

  export type AccessLogCreateManyUserInputEnvelope = {
    data: AccessLogCreateManyUserInput | AccessLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AdminCreateWithoutUserInput = {
    id?: string
  }

  export type AdminUncheckedCreateWithoutUserInput = {
    id?: string
  }

  export type AdminCreateOrConnectWithoutUserInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
  }

  export type ConsentCreateWithoutUserInput = {
    id?: string
    type: $Enums.ConsentType
    agreed: boolean
    version?: string
    createdAt?: Date | string
  }

  export type ConsentUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.ConsentType
    agreed: boolean
    version?: string
    createdAt?: Date | string
  }

  export type ConsentCreateOrConnectWithoutUserInput = {
    where: ConsentWhereUniqueInput
    create: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput>
  }

  export type ConsentCreateManyUserInputEnvelope = {
    data: ConsentCreateManyUserInput | ConsentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConnectionUpsertWithWhereUniqueWithoutFromUserInput = {
    where: ConnectionWhereUniqueInput
    update: XOR<ConnectionUpdateWithoutFromUserInput, ConnectionUncheckedUpdateWithoutFromUserInput>
    create: XOR<ConnectionCreateWithoutFromUserInput, ConnectionUncheckedCreateWithoutFromUserInput>
  }

  export type ConnectionUpdateWithWhereUniqueWithoutFromUserInput = {
    where: ConnectionWhereUniqueInput
    data: XOR<ConnectionUpdateWithoutFromUserInput, ConnectionUncheckedUpdateWithoutFromUserInput>
  }

  export type ConnectionUpdateManyWithWhereWithoutFromUserInput = {
    where: ConnectionScalarWhereInput
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyWithoutFromUserInput>
  }

  export type ConnectionScalarWhereInput = {
    AND?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
    OR?: ConnectionScalarWhereInput[]
    NOT?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
    id?: StringFilter<"Connection"> | string
    fromUserId?: StringFilter<"Connection"> | string
    toUserId?: StringFilter<"Connection"> | string
    intimacy?: IntFilter<"Connection"> | number
    cohabiting?: BoolFilter<"Connection"> | boolean
    hasConflict?: BoolFilter<"Connection"> | boolean
    responseChannel?: StringFilter<"Connection"> | string
    tone?: EnumToneFilter<"Connection"> | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFilter<"Connection"> | $Enums.SensitiveStatus
    currentDepth?: IntFilter<"Connection"> | number
    skipCount?: IntFilter<"Connection"> | number
    answerCount?: IntFilter<"Connection"> | number
    inviteCode?: StringNullableFilter<"Connection"> | string | null
    createdAt?: DateTimeFilter<"Connection"> | Date | string
    updatedAt?: DateTimeFilter<"Connection"> | Date | string
  }

  export type ConnectionUpsertWithWhereUniqueWithoutToUserInput = {
    where: ConnectionWhereUniqueInput
    update: XOR<ConnectionUpdateWithoutToUserInput, ConnectionUncheckedUpdateWithoutToUserInput>
    create: XOR<ConnectionCreateWithoutToUserInput, ConnectionUncheckedCreateWithoutToUserInput>
  }

  export type ConnectionUpdateWithWhereUniqueWithoutToUserInput = {
    where: ConnectionWhereUniqueInput
    data: XOR<ConnectionUpdateWithoutToUserInput, ConnectionUncheckedUpdateWithoutToUserInput>
  }

  export type ConnectionUpdateManyWithWhereWithoutToUserInput = {
    where: ConnectionScalarWhereInput
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyWithoutToUserInput>
  }

  export type ConnectionInviteUpsertWithWhereUniqueWithoutChildInput = {
    where: ConnectionInviteWhereUniqueInput
    update: XOR<ConnectionInviteUpdateWithoutChildInput, ConnectionInviteUncheckedUpdateWithoutChildInput>
    create: XOR<ConnectionInviteCreateWithoutChildInput, ConnectionInviteUncheckedCreateWithoutChildInput>
  }

  export type ConnectionInviteUpdateWithWhereUniqueWithoutChildInput = {
    where: ConnectionInviteWhereUniqueInput
    data: XOR<ConnectionInviteUpdateWithoutChildInput, ConnectionInviteUncheckedUpdateWithoutChildInput>
  }

  export type ConnectionInviteUpdateManyWithWhereWithoutChildInput = {
    where: ConnectionInviteScalarWhereInput
    data: XOR<ConnectionInviteUpdateManyMutationInput, ConnectionInviteUncheckedUpdateManyWithoutChildInput>
  }

  export type ConnectionInviteScalarWhereInput = {
    AND?: ConnectionInviteScalarWhereInput | ConnectionInviteScalarWhereInput[]
    OR?: ConnectionInviteScalarWhereInput[]
    NOT?: ConnectionInviteScalarWhereInput | ConnectionInviteScalarWhereInput[]
    id?: StringFilter<"ConnectionInvite"> | string
    code?: StringFilter<"ConnectionInvite"> | string
    childId?: StringFilter<"ConnectionInvite"> | string
    acceptedById?: StringNullableFilter<"ConnectionInvite"> | string | null
    connectionId?: StringNullableFilter<"ConnectionInvite"> | string | null
    tone?: EnumToneFilter<"ConnectionInvite"> | $Enums.Tone
    intimacy?: IntFilter<"ConnectionInvite"> | number
    cohabiting?: BoolFilter<"ConnectionInvite"> | boolean
    responseChannel?: StringFilter<"ConnectionInvite"> | string
    createdAt?: DateTimeFilter<"ConnectionInvite"> | Date | string
    acceptedAt?: DateTimeNullableFilter<"ConnectionInvite"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ConnectionInvite"> | Date | string | null
  }

  export type ConnectionInviteUpsertWithWhereUniqueWithoutAcceptedByInput = {
    where: ConnectionInviteWhereUniqueInput
    update: XOR<ConnectionInviteUpdateWithoutAcceptedByInput, ConnectionInviteUncheckedUpdateWithoutAcceptedByInput>
    create: XOR<ConnectionInviteCreateWithoutAcceptedByInput, ConnectionInviteUncheckedCreateWithoutAcceptedByInput>
  }

  export type ConnectionInviteUpdateWithWhereUniqueWithoutAcceptedByInput = {
    where: ConnectionInviteWhereUniqueInput
    data: XOR<ConnectionInviteUpdateWithoutAcceptedByInput, ConnectionInviteUncheckedUpdateWithoutAcceptedByInput>
  }

  export type ConnectionInviteUpdateManyWithWhereWithoutAcceptedByInput = {
    where: ConnectionInviteScalarWhereInput
    data: XOR<ConnectionInviteUpdateManyMutationInput, ConnectionInviteUncheckedUpdateManyWithoutAcceptedByInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type ReactionUpsertWithWhereUniqueWithoutUserInput = {
    where: ReactionWhereUniqueInput
    update: XOR<ReactionUpdateWithoutUserInput, ReactionUncheckedUpdateWithoutUserInput>
    create: XOR<ReactionCreateWithoutUserInput, ReactionUncheckedCreateWithoutUserInput>
  }

  export type ReactionUpdateWithWhereUniqueWithoutUserInput = {
    where: ReactionWhereUniqueInput
    data: XOR<ReactionUpdateWithoutUserInput, ReactionUncheckedUpdateWithoutUserInput>
  }

  export type ReactionUpdateManyWithWhereWithoutUserInput = {
    where: ReactionScalarWhereInput
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyWithoutUserInput>
  }

  export type ReactionScalarWhereInput = {
    AND?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
    OR?: ReactionScalarWhereInput[]
    NOT?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
    id?: StringFilter<"Reaction"> | string
    answerId?: StringFilter<"Reaction"> | string
    userId?: StringFilter<"Reaction"> | string
    emoji?: StringNullableFilter<"Reaction"> | string | null
    comment?: StringNullableFilter<"Reaction"> | string | null
    isFollowup?: BoolFilter<"Reaction"> | boolean
    notified?: BoolFilter<"Reaction"> | boolean
    createdAt?: DateTimeFilter<"Reaction"> | Date | string
  }

  export type AccessLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AccessLogWhereUniqueInput
    update: XOR<AccessLogUpdateWithoutUserInput, AccessLogUncheckedUpdateWithoutUserInput>
    create: XOR<AccessLogCreateWithoutUserInput, AccessLogUncheckedCreateWithoutUserInput>
  }

  export type AccessLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AccessLogWhereUniqueInput
    data: XOR<AccessLogUpdateWithoutUserInput, AccessLogUncheckedUpdateWithoutUserInput>
  }

  export type AccessLogUpdateManyWithWhereWithoutUserInput = {
    where: AccessLogScalarWhereInput
    data: XOR<AccessLogUpdateManyMutationInput, AccessLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AccessLogScalarWhereInput = {
    AND?: AccessLogScalarWhereInput | AccessLogScalarWhereInput[]
    OR?: AccessLogScalarWhereInput[]
    NOT?: AccessLogScalarWhereInput | AccessLogScalarWhereInput[]
    id?: StringFilter<"AccessLog"> | string
    userId?: StringNullableFilter<"AccessLog"> | string | null
    email?: StringNullableFilter<"AccessLog"> | string | null
    name?: StringNullableFilter<"AccessLog"> | string | null
    ipAddress?: StringNullableFilter<"AccessLog"> | string | null
    userAgent?: StringNullableFilter<"AccessLog"> | string | null
    path?: StringNullableFilter<"AccessLog"> | string | null
    referrer?: StringNullableFilter<"AccessLog"> | string | null
    createdAt?: DateTimeFilter<"AccessLog"> | Date | string
  }

  export type AdminUpsertWithoutUserInput = {
    update: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
    create: XOR<AdminCreateWithoutUserInput, AdminUncheckedCreateWithoutUserInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutUserInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutUserInput, AdminUncheckedUpdateWithoutUserInput>
  }

  export type AdminUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type ConsentUpsertWithWhereUniqueWithoutUserInput = {
    where: ConsentWhereUniqueInput
    update: XOR<ConsentUpdateWithoutUserInput, ConsentUncheckedUpdateWithoutUserInput>
    create: XOR<ConsentCreateWithoutUserInput, ConsentUncheckedCreateWithoutUserInput>
  }

  export type ConsentUpdateWithWhereUniqueWithoutUserInput = {
    where: ConsentWhereUniqueInput
    data: XOR<ConsentUpdateWithoutUserInput, ConsentUncheckedUpdateWithoutUserInput>
  }

  export type ConsentUpdateManyWithWhereWithoutUserInput = {
    where: ConsentScalarWhereInput
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyWithoutUserInput>
  }

  export type ConsentScalarWhereInput = {
    AND?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
    OR?: ConsentScalarWhereInput[]
    NOT?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
    id?: StringFilter<"Consent"> | string
    userId?: StringFilter<"Consent"> | string
    type?: EnumConsentTypeFilter<"Consent"> | $Enums.ConsentType
    agreed?: BoolFilter<"Consent"> | boolean
    version?: StringFilter<"Consent"> | string
    createdAt?: DateTimeFilter<"Consent"> | Date | string
  }

  export type UserCreateWithoutConsentsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogCreateNestedManyWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConsentsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionUncheckedCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionUncheckedCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConsentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConsentsInput, UserUncheckedCreateWithoutConsentsInput>
  }

  export type UserUpsertWithoutConsentsInput = {
    update: XOR<UserUpdateWithoutConsentsInput, UserUncheckedUpdateWithoutConsentsInput>
    create: XOR<UserCreateWithoutConsentsInput, UserUncheckedCreateWithoutConsentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConsentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConsentsInput, UserUncheckedUpdateWithoutConsentsInput>
  }

  export type UserUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUpdateManyWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUncheckedUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUncheckedUpdateManyWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteCreateNestedManyWithoutAcceptedByInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogCreateNestedManyWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionUncheckedCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionUncheckedCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUpdateManyWithoutAcceptedByNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUpdateManyWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUncheckedUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUncheckedUpdateManyWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSentConnectionsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receivedConnections?: ConnectionCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogCreateNestedManyWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSentConnectionsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receivedConnections?: ConnectionUncheckedCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSentConnectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentConnectionsInput, UserUncheckedCreateWithoutSentConnectionsInput>
  }

  export type UserCreateWithoutReceivedConnectionsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionCreateNestedManyWithoutFromUserInput
    childInvites?: ConnectionInviteCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogCreateNestedManyWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceivedConnectionsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionUncheckedCreateNestedManyWithoutFromUserInput
    childInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceivedConnectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedConnectionsInput, UserUncheckedCreateWithoutReceivedConnectionsInput>
  }

  export type QuestionCreateWithoutConnectionInput = {
    id?: string
    body: string
    depth: number
    chapterTag?: string | null
    personTag?: string | null
    eraTag?: string | null
    source?: $Enums.QuestionSource
    sentAt?: Date | string | null
    createdAt?: Date | string
    answer?: AnswerCreateNestedOneWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutConnectionInput = {
    id?: string
    body: string
    depth: number
    chapterTag?: string | null
    personTag?: string | null
    eraTag?: string | null
    source?: $Enums.QuestionSource
    sentAt?: Date | string | null
    createdAt?: Date | string
    answer?: AnswerUncheckedCreateNestedOneWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutConnectionInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutConnectionInput, QuestionUncheckedCreateWithoutConnectionInput>
  }

  export type QuestionCreateManyConnectionInputEnvelope = {
    data: QuestionCreateManyConnectionInput | QuestionCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type BookEditionCreateWithoutConnectionInput = {
    id?: string
    rangeFrom: Date | string
    rangeTo?: Date | string | null
    status?: $Enums.BookStatus
    editionType?: $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookEditionUncheckedCreateWithoutConnectionInput = {
    id?: string
    rangeFrom: Date | string
    rangeTo?: Date | string | null
    status?: $Enums.BookStatus
    editionType?: $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookEditionCreateOrConnectWithoutConnectionInput = {
    where: BookEditionWhereUniqueInput
    create: XOR<BookEditionCreateWithoutConnectionInput, BookEditionUncheckedCreateWithoutConnectionInput>
  }

  export type BookEditionCreateManyConnectionInputEnvelope = {
    data: BookEditionCreateManyConnectionInput | BookEditionCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type ConnectionInviteCreateWithoutConnectionInput = {
    id?: string
    code: string
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
    child: UserCreateNestedOneWithoutChildInvitesInput
    acceptedBy?: UserCreateNestedOneWithoutAcceptedInvitesInput
  }

  export type ConnectionInviteUncheckedCreateWithoutConnectionInput = {
    id?: string
    code: string
    childId: string
    acceptedById?: string | null
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConnectionInviteCreateOrConnectWithoutConnectionInput = {
    where: ConnectionInviteWhereUniqueInput
    create: XOR<ConnectionInviteCreateWithoutConnectionInput, ConnectionInviteUncheckedCreateWithoutConnectionInput>
  }

  export type UserUpsertWithoutSentConnectionsInput = {
    update: XOR<UserUpdateWithoutSentConnectionsInput, UserUncheckedUpdateWithoutSentConnectionsInput>
    create: XOR<UserCreateWithoutSentConnectionsInput, UserUncheckedCreateWithoutSentConnectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentConnectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentConnectionsInput, UserUncheckedUpdateWithoutSentConnectionsInput>
  }

  export type UserUpdateWithoutSentConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedConnections?: ConnectionUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUpdateManyWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receivedConnections?: ConnectionUncheckedUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUncheckedUpdateManyWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReceivedConnectionsInput = {
    update: XOR<UserUpdateWithoutReceivedConnectionsInput, UserUncheckedUpdateWithoutReceivedConnectionsInput>
    create: XOR<UserCreateWithoutReceivedConnectionsInput, UserUncheckedCreateWithoutReceivedConnectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedConnectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedConnectionsInput, UserUncheckedUpdateWithoutReceivedConnectionsInput>
  }

  export type UserUpdateWithoutReceivedConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUpdateManyWithoutFromUserNestedInput
    childInvites?: ConnectionInviteUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUpdateManyWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUncheckedUpdateManyWithoutFromUserNestedInput
    childInvites?: ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUncheckedUpdateManyWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type QuestionUpsertWithWhereUniqueWithoutConnectionInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutConnectionInput, QuestionUncheckedUpdateWithoutConnectionInput>
    create: XOR<QuestionCreateWithoutConnectionInput, QuestionUncheckedCreateWithoutConnectionInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutConnectionInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutConnectionInput, QuestionUncheckedUpdateWithoutConnectionInput>
  }

  export type QuestionUpdateManyWithWhereWithoutConnectionInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutConnectionInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: StringFilter<"Question"> | string
    connectionId?: StringFilter<"Question"> | string
    body?: StringFilter<"Question"> | string
    depth?: IntFilter<"Question"> | number
    chapterTag?: StringNullableFilter<"Question"> | string | null
    personTag?: StringNullableFilter<"Question"> | string | null
    eraTag?: StringNullableFilter<"Question"> | string | null
    source?: EnumQuestionSourceFilter<"Question"> | $Enums.QuestionSource
    sentAt?: DateTimeNullableFilter<"Question"> | Date | string | null
    createdAt?: DateTimeFilter<"Question"> | Date | string
  }

  export type BookEditionUpsertWithWhereUniqueWithoutConnectionInput = {
    where: BookEditionWhereUniqueInput
    update: XOR<BookEditionUpdateWithoutConnectionInput, BookEditionUncheckedUpdateWithoutConnectionInput>
    create: XOR<BookEditionCreateWithoutConnectionInput, BookEditionUncheckedCreateWithoutConnectionInput>
  }

  export type BookEditionUpdateWithWhereUniqueWithoutConnectionInput = {
    where: BookEditionWhereUniqueInput
    data: XOR<BookEditionUpdateWithoutConnectionInput, BookEditionUncheckedUpdateWithoutConnectionInput>
  }

  export type BookEditionUpdateManyWithWhereWithoutConnectionInput = {
    where: BookEditionScalarWhereInput
    data: XOR<BookEditionUpdateManyMutationInput, BookEditionUncheckedUpdateManyWithoutConnectionInput>
  }

  export type BookEditionScalarWhereInput = {
    AND?: BookEditionScalarWhereInput | BookEditionScalarWhereInput[]
    OR?: BookEditionScalarWhereInput[]
    NOT?: BookEditionScalarWhereInput | BookEditionScalarWhereInput[]
    id?: StringFilter<"BookEdition"> | string
    connectionId?: StringFilter<"BookEdition"> | string
    rangeFrom?: DateTimeFilter<"BookEdition"> | Date | string
    rangeTo?: DateTimeNullableFilter<"BookEdition"> | Date | string | null
    status?: EnumBookStatusFilter<"BookEdition"> | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFilter<"BookEdition"> | $Enums.BookEditionType
    chapterData?: JsonNullableFilter<"BookEdition">
    pdfUrl?: StringNullableFilter<"BookEdition"> | string | null
    createdAt?: DateTimeFilter<"BookEdition"> | Date | string
    updatedAt?: DateTimeFilter<"BookEdition"> | Date | string
  }

  export type ConnectionInviteUpsertWithoutConnectionInput = {
    update: XOR<ConnectionInviteUpdateWithoutConnectionInput, ConnectionInviteUncheckedUpdateWithoutConnectionInput>
    create: XOR<ConnectionInviteCreateWithoutConnectionInput, ConnectionInviteUncheckedCreateWithoutConnectionInput>
    where?: ConnectionInviteWhereInput
  }

  export type ConnectionInviteUpdateToOneWithWhereWithoutConnectionInput = {
    where?: ConnectionInviteWhereInput
    data: XOR<ConnectionInviteUpdateWithoutConnectionInput, ConnectionInviteUncheckedUpdateWithoutConnectionInput>
  }

  export type ConnectionInviteUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    child?: UserUpdateOneRequiredWithoutChildInvitesNestedInput
    acceptedBy?: UserUpdateOneWithoutAcceptedInvitesNestedInput
  }

  export type ConnectionInviteUncheckedUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    acceptedById?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateWithoutChildInvitesInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionCreateNestedManyWithoutToUserInput
    acceptedInvites?: ConnectionInviteCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogCreateNestedManyWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChildInvitesInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionUncheckedCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionUncheckedCreateNestedManyWithoutToUserInput
    acceptedInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChildInvitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChildInvitesInput, UserUncheckedCreateWithoutChildInvitesInput>
  }

  export type UserCreateWithoutAcceptedInvitesInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteCreateNestedManyWithoutChildInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogCreateNestedManyWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAcceptedInvitesInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionUncheckedCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionUncheckedCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutChildInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAcceptedInvitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAcceptedInvitesInput, UserUncheckedCreateWithoutAcceptedInvitesInput>
  }

  export type ConnectionCreateWithoutInviteInput = {
    id?: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutSentConnectionsInput
    toUser: UserCreateNestedOneWithoutReceivedConnectionsInput
    questions?: QuestionCreateNestedManyWithoutConnectionInput
    bookEditions?: BookEditionCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutInviteInput = {
    id?: string
    fromUserId: string
    toUserId: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutConnectionInput
    bookEditions?: BookEditionUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutInviteInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutInviteInput, ConnectionUncheckedCreateWithoutInviteInput>
  }

  export type UserUpsertWithoutChildInvitesInput = {
    update: XOR<UserUpdateWithoutChildInvitesInput, UserUncheckedUpdateWithoutChildInvitesInput>
    create: XOR<UserCreateWithoutChildInvitesInput, UserUncheckedCreateWithoutChildInvitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChildInvitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChildInvitesInput, UserUncheckedUpdateWithoutChildInvitesInput>
  }

  export type UserUpdateWithoutChildInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUpdateManyWithoutToUserNestedInput
    acceptedInvites?: ConnectionInviteUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUpdateManyWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChildInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUncheckedUpdateManyWithoutToUserNestedInput
    acceptedInvites?: ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUncheckedUpdateManyWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutAcceptedInvitesInput = {
    update: XOR<UserUpdateWithoutAcceptedInvitesInput, UserUncheckedUpdateWithoutAcceptedInvitesInput>
    create: XOR<UserCreateWithoutAcceptedInvitesInput, UserUncheckedCreateWithoutAcceptedInvitesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAcceptedInvitesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAcceptedInvitesInput, UserUncheckedUpdateWithoutAcceptedInvitesInput>
  }

  export type UserUpdateWithoutAcceptedInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUpdateManyWithoutChildNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUpdateManyWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAcceptedInvitesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUncheckedUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUncheckedUpdateManyWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConnectionUpsertWithoutInviteInput = {
    update: XOR<ConnectionUpdateWithoutInviteInput, ConnectionUncheckedUpdateWithoutInviteInput>
    create: XOR<ConnectionCreateWithoutInviteInput, ConnectionUncheckedCreateWithoutInviteInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutInviteInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutInviteInput, ConnectionUncheckedUpdateWithoutInviteInput>
  }

  export type ConnectionUpdateWithoutInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutSentConnectionsNestedInput
    toUser?: UserUpdateOneRequiredWithoutReceivedConnectionsNestedInput
    questions?: QuestionUpdateManyWithoutConnectionNestedInput
    bookEditions?: BookEditionUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutInviteInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutConnectionNestedInput
    bookEditions?: BookEditionUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type ConnectionCreateWithoutQuestionsInput = {
    id?: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutSentConnectionsInput
    toUser: UserCreateNestedOneWithoutReceivedConnectionsInput
    bookEditions?: BookEditionCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutQuestionsInput = {
    id?: string
    fromUserId: string
    toUserId: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookEditions?: BookEditionUncheckedCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteUncheckedCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutQuestionsInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutQuestionsInput, ConnectionUncheckedCreateWithoutQuestionsInput>
  }

  export type AnswerCreateWithoutQuestionInput = {
    id?: string
    format?: $Enums.AnswerFormat
    origin?: $Enums.AnswerOrigin
    body?: string | null
    mediaUrl?: string | null
    transcript?: string | null
    skipped?: boolean
    receivedVia?: string
    isPrivate?: boolean
    keywords?: AnswerCreatekeywordsInput | string[]
    aiComposed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: ReactionCreateNestedManyWithoutAnswerInput
  }

  export type AnswerUncheckedCreateWithoutQuestionInput = {
    id?: string
    format?: $Enums.AnswerFormat
    origin?: $Enums.AnswerOrigin
    body?: string | null
    mediaUrl?: string | null
    transcript?: string | null
    skipped?: boolean
    receivedVia?: string
    isPrivate?: boolean
    keywords?: AnswerCreatekeywordsInput | string[]
    aiComposed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    reactions?: ReactionUncheckedCreateNestedManyWithoutAnswerInput
  }

  export type AnswerCreateOrConnectWithoutQuestionInput = {
    where: AnswerWhereUniqueInput
    create: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
  }

  export type ConnectionUpsertWithoutQuestionsInput = {
    update: XOR<ConnectionUpdateWithoutQuestionsInput, ConnectionUncheckedUpdateWithoutQuestionsInput>
    create: XOR<ConnectionCreateWithoutQuestionsInput, ConnectionUncheckedCreateWithoutQuestionsInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutQuestionsInput, ConnectionUncheckedUpdateWithoutQuestionsInput>
  }

  export type ConnectionUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutSentConnectionsNestedInput
    toUser?: UserUpdateOneRequiredWithoutReceivedConnectionsNestedInput
    bookEditions?: BookEditionUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUpdateOneWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookEditions?: BookEditionUncheckedUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUncheckedUpdateOneWithoutConnectionNestedInput
  }

  export type AnswerUpsertWithoutQuestionInput = {
    update: XOR<AnswerUpdateWithoutQuestionInput, AnswerUncheckedUpdateWithoutQuestionInput>
    create: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
    where?: AnswerWhereInput
  }

  export type AnswerUpdateToOneWithWhereWithoutQuestionInput = {
    where?: AnswerWhereInput
    data: XOR<AnswerUpdateWithoutQuestionInput, AnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type AnswerUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: EnumAnswerFormatFieldUpdateOperationsInput | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFieldUpdateOperationsInput | $Enums.AnswerOrigin
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    skipped?: BoolFieldUpdateOperationsInput | boolean
    receivedVia?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    keywords?: AnswerUpdatekeywordsInput | string[]
    aiComposed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: ReactionUpdateManyWithoutAnswerNestedInput
  }

  export type AnswerUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: EnumAnswerFormatFieldUpdateOperationsInput | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFieldUpdateOperationsInput | $Enums.AnswerOrigin
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    skipped?: BoolFieldUpdateOperationsInput | boolean
    receivedVia?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    keywords?: AnswerUpdatekeywordsInput | string[]
    aiComposed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: ReactionUncheckedUpdateManyWithoutAnswerNestedInput
  }

  export type QuestionCreateWithoutAnswerInput = {
    id?: string
    body: string
    depth: number
    chapterTag?: string | null
    personTag?: string | null
    eraTag?: string | null
    source?: $Enums.QuestionSource
    sentAt?: Date | string | null
    createdAt?: Date | string
    connection: ConnectionCreateNestedOneWithoutQuestionsInput
  }

  export type QuestionUncheckedCreateWithoutAnswerInput = {
    id?: string
    connectionId: string
    body: string
    depth: number
    chapterTag?: string | null
    personTag?: string | null
    eraTag?: string | null
    source?: $Enums.QuestionSource
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type QuestionCreateOrConnectWithoutAnswerInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutAnswerInput, QuestionUncheckedCreateWithoutAnswerInput>
  }

  export type ReactionCreateWithoutAnswerInput = {
    id?: string
    emoji?: string | null
    comment?: string | null
    isFollowup?: boolean
    notified?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReactionsInput
  }

  export type ReactionUncheckedCreateWithoutAnswerInput = {
    id?: string
    userId: string
    emoji?: string | null
    comment?: string | null
    isFollowup?: boolean
    notified?: boolean
    createdAt?: Date | string
  }

  export type ReactionCreateOrConnectWithoutAnswerInput = {
    where: ReactionWhereUniqueInput
    create: XOR<ReactionCreateWithoutAnswerInput, ReactionUncheckedCreateWithoutAnswerInput>
  }

  export type ReactionCreateManyAnswerInputEnvelope = {
    data: ReactionCreateManyAnswerInput | ReactionCreateManyAnswerInput[]
    skipDuplicates?: boolean
  }

  export type QuestionUpsertWithoutAnswerInput = {
    update: XOR<QuestionUpdateWithoutAnswerInput, QuestionUncheckedUpdateWithoutAnswerInput>
    create: XOR<QuestionCreateWithoutAnswerInput, QuestionUncheckedCreateWithoutAnswerInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutAnswerInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutAnswerInput, QuestionUncheckedUpdateWithoutAnswerInput>
  }

  export type QuestionUpdateWithoutAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: NullableStringFieldUpdateOperationsInput | string | null
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    source?: EnumQuestionSourceFieldUpdateOperationsInput | $Enums.QuestionSource
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connection?: ConnectionUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type QuestionUncheckedUpdateWithoutAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: NullableStringFieldUpdateOperationsInput | string | null
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    source?: EnumQuestionSourceFieldUpdateOperationsInput | $Enums.QuestionSource
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionUpsertWithWhereUniqueWithoutAnswerInput = {
    where: ReactionWhereUniqueInput
    update: XOR<ReactionUpdateWithoutAnswerInput, ReactionUncheckedUpdateWithoutAnswerInput>
    create: XOR<ReactionCreateWithoutAnswerInput, ReactionUncheckedCreateWithoutAnswerInput>
  }

  export type ReactionUpdateWithWhereUniqueWithoutAnswerInput = {
    where: ReactionWhereUniqueInput
    data: XOR<ReactionUpdateWithoutAnswerInput, ReactionUncheckedUpdateWithoutAnswerInput>
  }

  export type ReactionUpdateManyWithWhereWithoutAnswerInput = {
    where: ReactionScalarWhereInput
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyWithoutAnswerInput>
  }

  export type AnswerCreateWithoutReactionsInput = {
    id?: string
    format?: $Enums.AnswerFormat
    origin?: $Enums.AnswerOrigin
    body?: string | null
    mediaUrl?: string | null
    transcript?: string | null
    skipped?: boolean
    receivedVia?: string
    isPrivate?: boolean
    keywords?: AnswerCreatekeywordsInput | string[]
    aiComposed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    question: QuestionCreateNestedOneWithoutAnswerInput
  }

  export type AnswerUncheckedCreateWithoutReactionsInput = {
    id?: string
    questionId: string
    format?: $Enums.AnswerFormat
    origin?: $Enums.AnswerOrigin
    body?: string | null
    mediaUrl?: string | null
    transcript?: string | null
    skipped?: boolean
    receivedVia?: string
    isPrivate?: boolean
    keywords?: AnswerCreatekeywordsInput | string[]
    aiComposed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnswerCreateOrConnectWithoutReactionsInput = {
    where: AnswerWhereUniqueInput
    create: XOR<AnswerCreateWithoutReactionsInput, AnswerUncheckedCreateWithoutReactionsInput>
  }

  export type UserCreateWithoutReactionsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogCreateNestedManyWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReactionsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionUncheckedCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionUncheckedCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReactionsInput, UserUncheckedCreateWithoutReactionsInput>
  }

  export type AnswerUpsertWithoutReactionsInput = {
    update: XOR<AnswerUpdateWithoutReactionsInput, AnswerUncheckedUpdateWithoutReactionsInput>
    create: XOR<AnswerCreateWithoutReactionsInput, AnswerUncheckedCreateWithoutReactionsInput>
    where?: AnswerWhereInput
  }

  export type AnswerUpdateToOneWithWhereWithoutReactionsInput = {
    where?: AnswerWhereInput
    data: XOR<AnswerUpdateWithoutReactionsInput, AnswerUncheckedUpdateWithoutReactionsInput>
  }

  export type AnswerUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    format?: EnumAnswerFormatFieldUpdateOperationsInput | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFieldUpdateOperationsInput | $Enums.AnswerOrigin
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    skipped?: BoolFieldUpdateOperationsInput | boolean
    receivedVia?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    keywords?: AnswerUpdatekeywordsInput | string[]
    aiComposed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutAnswerNestedInput
  }

  export type AnswerUncheckedUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    format?: EnumAnswerFormatFieldUpdateOperationsInput | $Enums.AnswerFormat
    origin?: EnumAnswerOriginFieldUpdateOperationsInput | $Enums.AnswerOrigin
    body?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    transcript?: NullableStringFieldUpdateOperationsInput | string | null
    skipped?: BoolFieldUpdateOperationsInput | boolean
    receivedVia?: StringFieldUpdateOperationsInput | string
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    keywords?: AnswerUpdatekeywordsInput | string[]
    aiComposed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutReactionsInput = {
    update: XOR<UserUpdateWithoutReactionsInput, UserUncheckedUpdateWithoutReactionsInput>
    create: XOR<UserCreateWithoutReactionsInput, UserUncheckedCreateWithoutReactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReactionsInput, UserUncheckedUpdateWithoutReactionsInput>
  }

  export type UserUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUpdateManyWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUncheckedUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUncheckedUpdateManyWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConnectionCreateWithoutBookEditionsInput = {
    id?: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromUser: UserCreateNestedOneWithoutSentConnectionsInput
    toUser: UserCreateNestedOneWithoutReceivedConnectionsInput
    questions?: QuestionCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionUncheckedCreateWithoutBookEditionsInput = {
    id?: string
    fromUserId: string
    toUserId: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutConnectionInput
    invite?: ConnectionInviteUncheckedCreateNestedOneWithoutConnectionInput
  }

  export type ConnectionCreateOrConnectWithoutBookEditionsInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutBookEditionsInput, ConnectionUncheckedCreateWithoutBookEditionsInput>
  }

  export type ConnectionUpsertWithoutBookEditionsInput = {
    update: XOR<ConnectionUpdateWithoutBookEditionsInput, ConnectionUncheckedUpdateWithoutBookEditionsInput>
    create: XOR<ConnectionCreateWithoutBookEditionsInput, ConnectionUncheckedCreateWithoutBookEditionsInput>
    where?: ConnectionWhereInput
  }

  export type ConnectionUpdateToOneWithWhereWithoutBookEditionsInput = {
    where?: ConnectionWhereInput
    data: XOR<ConnectionUpdateWithoutBookEditionsInput, ConnectionUncheckedUpdateWithoutBookEditionsInput>
  }

  export type ConnectionUpdateWithoutBookEditionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutSentConnectionsNestedInput
    toUser?: UserUpdateOneRequiredWithoutReceivedConnectionsNestedInput
    questions?: QuestionUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUpdateOneWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutBookEditionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUncheckedUpdateOneWithoutConnectionNestedInput
  }

  export type UserCreateWithoutAccessLogsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
    admin?: AdminCreateNestedOneWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccessLogsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionUncheckedCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionUncheckedCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
    admin?: AdminUncheckedCreateNestedOneWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccessLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccessLogsInput, UserUncheckedCreateWithoutAccessLogsInput>
  }

  export type UserUpsertWithoutAccessLogsInput = {
    update: XOR<UserUpdateWithoutAccessLogsInput, UserUncheckedUpdateWithoutAccessLogsInput>
    create: XOR<UserCreateWithoutAccessLogsInput, UserUncheckedCreateWithoutAccessLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccessLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccessLogsInput, UserUncheckedUpdateWithoutAccessLogsInput>
  }

  export type UserUpdateWithoutAccessLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
    admin?: AdminUpdateOneWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccessLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUncheckedUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
    admin?: AdminUncheckedUpdateOneWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAdminInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    reactions?: ReactionCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogCreateNestedManyWithoutUserInput
    consents?: ConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminInput = {
    id?: string
    email?: string | null
    phone?: string | null
    name: string
    role: $Enums.Role
    avatarUrl?: string | null
    passwordHash?: string | null
    consentAnalytics?: boolean
    consentMarketing?: boolean
    consentAt?: Date | string | null
    lastSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sentConnections?: ConnectionUncheckedCreateNestedManyWithoutFromUserInput
    receivedConnections?: ConnectionUncheckedCreateNestedManyWithoutToUserInput
    childInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutChildInput
    acceptedInvites?: ConnectionInviteUncheckedCreateNestedManyWithoutAcceptedByInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    reactions?: ReactionUncheckedCreateNestedManyWithoutUserInput
    accessLogs?: AccessLogUncheckedCreateNestedManyWithoutUserInput
    consents?: ConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
  }

  export type UserUpsertWithoutAdminInput = {
    update: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
    create: XOR<UserCreateWithoutAdminInput, UserUncheckedCreateWithoutAdminInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminInput, UserUncheckedUpdateWithoutAdminInput>
  }

  export type UserUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    reactions?: ReactionUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUpdateManyWithoutUserNestedInput
    consents?: ConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    consentAnalytics?: BoolFieldUpdateOperationsInput | boolean
    consentMarketing?: BoolFieldUpdateOperationsInput | boolean
    consentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentConnections?: ConnectionUncheckedUpdateManyWithoutFromUserNestedInput
    receivedConnections?: ConnectionUncheckedUpdateManyWithoutToUserNestedInput
    childInvites?: ConnectionInviteUncheckedUpdateManyWithoutChildNestedInput
    acceptedInvites?: ConnectionInviteUncheckedUpdateManyWithoutAcceptedByNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    reactions?: ReactionUncheckedUpdateManyWithoutUserNestedInput
    accessLogs?: AccessLogUncheckedUpdateManyWithoutUserNestedInput
    consents?: ConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConnectionCreateManyFromUserInput = {
    id?: string
    toUserId: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectionCreateManyToUserInput = {
    id?: string
    fromUserId: string
    intimacy?: number
    cohabiting?: boolean
    hasConflict?: boolean
    responseChannel?: string
    tone?: $Enums.Tone
    sensitiveStatus?: $Enums.SensitiveStatus
    currentDepth?: number
    skipCount?: number
    answerCount?: number
    inviteCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectionInviteCreateManyChildInput = {
    id?: string
    code: string
    acceptedById?: string | null
    connectionId?: string | null
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type ConnectionInviteCreateManyAcceptedByInput = {
    id?: string
    code: string
    childId: string
    connectionId?: string | null
    tone?: $Enums.Tone
    intimacy?: number
    cohabiting?: boolean
    responseChannel?: string
    createdAt?: Date | string
    acceptedAt?: Date | string | null
    expiresAt?: Date | string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token?: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type ReactionCreateManyUserInput = {
    id?: string
    answerId: string
    emoji?: string | null
    comment?: string | null
    isFollowup?: boolean
    notified?: boolean
    createdAt?: Date | string
  }

  export type AccessLogCreateManyUserInput = {
    id?: string
    email?: string | null
    name?: string | null
    ipAddress?: string | null
    userAgent?: string | null
    path?: string | null
    referrer?: string | null
    createdAt?: Date | string
  }

  export type ConsentCreateManyUserInput = {
    id?: string
    type: $Enums.ConsentType
    agreed: boolean
    version?: string
    createdAt?: Date | string
  }

  export type ConnectionUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toUser?: UserUpdateOneRequiredWithoutReceivedConnectionsNestedInput
    questions?: QuestionUpdateManyWithoutConnectionNestedInput
    bookEditions?: BookEditionUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUpdateOneWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutConnectionNestedInput
    bookEditions?: BookEditionUncheckedUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUncheckedUpdateOneWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateManyWithoutFromUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    toUserId?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromUser?: UserUpdateOneRequiredWithoutSentConnectionsNestedInput
    questions?: QuestionUpdateManyWithoutConnectionNestedInput
    bookEditions?: BookEditionUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUpdateOneWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutConnectionNestedInput
    bookEditions?: BookEditionUncheckedUpdateManyWithoutConnectionNestedInput
    invite?: ConnectionInviteUncheckedUpdateOneWithoutConnectionNestedInput
  }

  export type ConnectionUncheckedUpdateManyWithoutToUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromUserId?: StringFieldUpdateOperationsInput | string
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    hasConflict?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    sensitiveStatus?: EnumSensitiveStatusFieldUpdateOperationsInput | $Enums.SensitiveStatus
    currentDepth?: IntFieldUpdateOperationsInput | number
    skipCount?: IntFieldUpdateOperationsInput | number
    answerCount?: IntFieldUpdateOperationsInput | number
    inviteCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionInviteUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    acceptedBy?: UserUpdateOneWithoutAcceptedInvitesNestedInput
    connection?: ConnectionUpdateOneWithoutInviteNestedInput
  }

  export type ConnectionInviteUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    acceptedById?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConnectionInviteUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    acceptedById?: NullableStringFieldUpdateOperationsInput | string | null
    connectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConnectionInviteUpdateWithoutAcceptedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    child?: UserUpdateOneRequiredWithoutChildInvitesNestedInput
    connection?: ConnectionUpdateOneWithoutInviteNestedInput
  }

  export type ConnectionInviteUncheckedUpdateWithoutAcceptedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    connectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConnectionInviteUncheckedUpdateManyWithoutAcceptedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    connectionId?: NullableStringFieldUpdateOperationsInput | string | null
    tone?: EnumToneFieldUpdateOperationsInput | $Enums.Tone
    intimacy?: IntFieldUpdateOperationsInput | number
    cohabiting?: BoolFieldUpdateOperationsInput | boolean
    responseChannel?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answer?: AnswerUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type ReactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccessLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    agreed?: BoolFieldUpdateOperationsInput | boolean
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    agreed?: BoolFieldUpdateOperationsInput | boolean
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumConsentTypeFieldUpdateOperationsInput | $Enums.ConsentType
    agreed?: BoolFieldUpdateOperationsInput | boolean
    version?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateManyConnectionInput = {
    id?: string
    body: string
    depth: number
    chapterTag?: string | null
    personTag?: string | null
    eraTag?: string | null
    source?: $Enums.QuestionSource
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type BookEditionCreateManyConnectionInput = {
    id?: string
    rangeFrom: Date | string
    rangeTo?: Date | string | null
    status?: $Enums.BookStatus
    editionType?: $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: NullableStringFieldUpdateOperationsInput | string | null
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    source?: EnumQuestionSourceFieldUpdateOperationsInput | $Enums.QuestionSource
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answer?: AnswerUpdateOneWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: NullableStringFieldUpdateOperationsInput | string | null
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    source?: EnumQuestionSourceFieldUpdateOperationsInput | $Enums.QuestionSource
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answer?: AnswerUncheckedUpdateOneWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    depth?: IntFieldUpdateOperationsInput | number
    chapterTag?: NullableStringFieldUpdateOperationsInput | string | null
    personTag?: NullableStringFieldUpdateOperationsInput | string | null
    eraTag?: NullableStringFieldUpdateOperationsInput | string | null
    source?: EnumQuestionSourceFieldUpdateOperationsInput | $Enums.QuestionSource
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookEditionUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    rangeFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    rangeTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFieldUpdateOperationsInput | $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookEditionUncheckedUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    rangeFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    rangeTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFieldUpdateOperationsInput | $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookEditionUncheckedUpdateManyWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    rangeFrom?: DateTimeFieldUpdateOperationsInput | Date | string
    rangeTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBookStatusFieldUpdateOperationsInput | $Enums.BookStatus
    editionType?: EnumBookEditionTypeFieldUpdateOperationsInput | $Enums.BookEditionType
    chapterData?: NullableJsonNullValueInput | InputJsonValue
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionCreateManyAnswerInput = {
    id?: string
    userId: string
    emoji?: string | null
    comment?: string | null
    isFollowup?: boolean
    notified?: boolean
    createdAt?: Date | string
  }

  export type ReactionUpdateWithoutAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type ReactionUncheckedUpdateWithoutAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionUncheckedUpdateManyWithoutAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    isFollowup?: BoolFieldUpdateOperationsInput | boolean
    notified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}