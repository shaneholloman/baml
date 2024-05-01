// This file is auto-generated. Do not edit this file manually.
//
// Disable formatting for this file to avoid linting errors.
// tslint:disable
// @ts-nocheck
/* eslint-disable */

const enum Category {
    Refund = "Refund",
    CancelOrder = "CancelOrder",
    TechnicalSupport = "TechnicalSupport",
    AccountIssue = "AccountIssue",
    Question = "Question",
}

const enum Category2 {
    Refund = "Refund",
    CancelOrder = "CancelOrder",
    TechnicalSupport = "TechnicalSupport",
    AccountIssue = "AccountIssue",
    Question = "Question",
}

const enum Category3 {
    Refund = "Refund",
    CancelOrder = "CancelOrder",
    TechnicalSupport = "TechnicalSupport",
    AccountIssue = "AccountIssue",
    Question = "Question",
}

const enum DataType {
    Resume = "Resume",
    Event = "Event",
}

const enum EnumInClass {
    ONE = "ONE",
    TWO = "TWO",
}

const enum EnumInClass2 {
    ONE = "ONE",
    TWO = "TWO",
}

const enum EnumOutput {
    ONE = "ONE",
    TWO = "TWO",
    THREE = "THREE",
}

const enum EnumOutput2 {
    ONE = "ONE",
    TWO = "TWO",
    THREE = "THREE",
}

const enum NamedArgsSingleEnum {
    ONE = "ONE",
    TWO = "TWO",
}

const enum NamedArgsSingleEnum2 {
    ONE = "ONE",
    TWO = "TWO",
}

const enum NamedArgsSingleEnumList {
    ONE = "ONE",
    TWO = "TWO",
}

const enum NamedArgsSingleEnumList2 {
    ONE = "ONE",
    TWO = "TWO",
}

const enum OptionalTest_CategoryType {
    Aleph = "Aleph",
    Beta = "Beta",
    Gamma = "Gamma",
}

const enum OptionalTest_CategoryTypev2 {
    Aleph = "Aleph",
    Beta = "Beta",
    Gamma = "Gamma",
}

const enum OrderStatus {
    ORDERED = "ORDERED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

const enum OverrideEnum {
    ONE = "ONE",
    TWO = "TWO",
}

const enum Tag {
    Security = "Security",
    AI = "AI",
    Blockchain = "Blockchain",
}

const enum TestEnum {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
}

interface Blah {
  prop4: string | null;
}

interface Blah2 {
  prop4: string | null;
}

interface ClassOptionalFields {
  prop1: string | null;
  prop2: string | null;
}

interface ClassOptionalFieldsv2 {
  prop1: string | null;
  prop2: string | null;
}

interface ClassOptionalOutput {
  prop1: string;
  prop2: string;
}

interface ClassOptionalOutput2 {
  prop1: string | null;
  prop2: string | null;
  prop3: Blah | null;
}

interface ClassOptionalOutput2v2 {
  prop1: string | null;
  prop2: string | null;
  prop3: Blah2 | null;
}

interface DynamicPropsClass {
  prop1: string;
  prop2: string;
  prop3: number;
}

interface Email {
  subject: string;
  body: string;
  from_address: string;
}

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
}

interface ModifiedOutput {
  reasoning: string;
  answer: string;
}

interface NamedArgsSingleClass {
  key: string;
  key_two: boolean;
  key_three: number;
}

interface NamedArgsSingleClass2 {
  key: string;
  key_two: boolean;
  key_three: number;
}

interface NamedArgsSingleClassList2 {
  key: string;
  key_two: boolean;
  key_three: number;
}

interface OptionalClass {
  prop1: string;
  prop2: string;
}

interface OptionalClassv2 {
  prop1: string;
  prop2: string;
}

interface OptionalTest_Prop1 {
  omega_a: string;
  omega_b: number;
}

interface OptionalTest_Prop1v2 {
  omega_a: string;
  omega_b: number;
}

interface OptionalTest_ReturnType {
  omega_1: OptionalTest_Prop1 | null;
  omega_2: string | null;
  omega_3: OptionalTest_CategoryType | null[];
}

interface OptionalTest_ReturnTypev2 {
  omega_1: OptionalTest_Prop1v2 | null;
  omega_2: string | null;
  omega_3: OptionalTest_CategoryTypev2 | null[];
}

interface OrderInfo {
  order_status: OrderStatus;
  tracking_number: string | null;
  estimated_arrival_date: string | null;
}

interface OverrideClass {
  prop1: string;
  prop2: string;
}

interface RaysData {
  dataType: DataType;
  value: Resume | Event;
}

interface Resume {
  name: string;
  email: string;
  phone: string;
  experience: string[];
  education: string[];
  skills: string[];
}

interface SearchParams {
  dateRange: number | null;
  location: string[];
  jobTitle: WithReasoning | null;
  company: WithReasoning | null;
  description: WithReasoning[];
  tags: Tag | string[];
}

interface SomeClass2 {
  prop1: string;
  prop2: string;
}

interface TestClassAlias {
  key: string;
  key2: string;
  key3: string;
  key4: string;
  key5: string;
}

interface TestClassWithEnum {
  prop1: string;
  prop2: EnumInClass;
}

interface TestClassWithEnum2 {
  prop1: string;
  prop2: EnumInClass;
}

interface TestOutputClass {
  prop1: string;
  prop2: number;
}

interface TestOutputClass2 {
  prop1: string;
  prop2: number;
}

interface UnionTest_ReturnType {
  prop1: string | boolean;
  prop2: number | boolean[];
  prop3: number[] | boolean[];
}

interface UnionTest_ReturnTypev2 {
  prop1: string | boolean;
  prop2: number | boolean[];
  prop3: number[] | boolean[];
}

interface WithReasoning {
  value: string;
  reasoning: string;
}


export { Category, Category2, Category3, DataType, EnumInClass, EnumInClass2, EnumOutput, EnumOutput2, NamedArgsSingleEnum, NamedArgsSingleEnum2, NamedArgsSingleEnumList, NamedArgsSingleEnumList2, OptionalTest_CategoryType, OptionalTest_CategoryTypev2, OrderStatus, OverrideEnum, Tag, TestEnum, Blah, Blah2, ClassOptionalFields, ClassOptionalFieldsv2, ClassOptionalOutput, ClassOptionalOutput2, ClassOptionalOutput2v2, DynamicPropsClass, Email, Event, ModifiedOutput, NamedArgsSingleClass, NamedArgsSingleClass2, NamedArgsSingleClassList2, OptionalClass, OptionalClassv2, OptionalTest_Prop1, OptionalTest_Prop1v2, OptionalTest_ReturnType, OptionalTest_ReturnTypev2, OrderInfo, OverrideClass, RaysData, Resume, SearchParams, SomeClass2, TestClassAlias, TestClassWithEnum, TestClassWithEnum2, TestOutputClass, TestOutputClass2, UnionTest_ReturnType, UnionTest_ReturnTypev2, WithReasoning }

