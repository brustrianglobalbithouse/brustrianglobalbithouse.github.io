declare module "santillana_traceability_library"
{
	var window: Window & typeof globalThis;
	let customWindow: any;

	class Trace {
	    private static instance;
	    private _traceabilityModule;
	    private _hasTrace;
	    private _traceabilityApiFactory;
	    private constructor();
	    get hasTrace(): boolean;
	    static getInstance(): Trace;
	    loadTraceabilityModule(): void;
	    setMaxScore(maxScore: number): void;
	    setMinScore(minScore: number): void;
	    setData(data: string): void;
	    getData(): string;
	    initialize(): boolean;
	    complete(score: number): boolean;
	    finish(): boolean;
	}
	export let instance: Trace;
	export {};

	export function getURLParameter(parametro: string, location?: string): any;

	import { TraceabilityApiContract } from './traceability-api.contract';
	export class AvAPI extends TraceabilityApiContract {
	    constructor();
	    initialize(): boolean;
	    complete(score?: number): boolean;
	    private sendToAv;
	    finish(): boolean;
	    setDataToStore(data: string): void;
	    getDataStored(): string;
	}

	import { TraceabilityApiContract } from './traceability-api.contract';
	export interface IScormAPI {
	    getDebug(): boolean;
	    initialize(): boolean;
	    complete(score?: number): boolean;
	    getMinScore(): number;
	    getMaxScore(): number;
	    setMinScore(score: number): void;
	    setMaxScore(score: number): void;
	    setDataToStore(data: string): void;
	    getDataStored(): string;
	}
	enum VERSION {
	    SCORM_2004 = "2004",
	    SCORM_12 = "1.2"
	}
	export class ScormAPI extends TraceabilityApiContract implements IScormAPI {
	    private _apiHandle;
	    private _version;
	    private _connectionActive;
	    private _completionStatusData;
	    private _exitStatusData;
	    private _handleCompletionStatus;
	    private _handleExitMode;
	    private _countInteractions;
	    constructor();
	    get connectionActive(): boolean;
	    get version(): VERSION;
	    setMaxScore(score: number): void;
	    setMinScore(score: number): void;
	    initialize(): boolean;
	    complete(score?: number): boolean;
	    finish(): boolean;
	    setDataToStore(data: string): void;
	    getDataStored(): string;
	    private getAPIHandle;
	    private getAPI;
	    private findAPI;
	    private getStatus;
	    private setStatus;
	    private getData;
	    private setData;
	    private saveData;
	    private debugGetCode;
	    private debugGetInfo;
	    private debugGetDiasnosticInfo;
	    private debugShowInfo;
	}
	export {};

	import { TraceabilityApiContract } from './traceability-api.contract';
	export class TincanAPI extends TraceabilityApiContract {
	    initialize(): boolean;
	    complete(score?: number): boolean;
	    finish(): boolean;
	    setDataToStore(data: string): void;
	    getDataStored(): string;
	}

	export abstract class TraceabilityApiContract {
	    protected _debug: boolean;
	    protected _startTime: any;
	    protected _endTime: any;
	    protected _score: any;
	    protected _maxScore: number;
	    protected _minScore: number;
	    getDebug(): boolean;
	    setDebug(debug: boolean): void;
	    getMaxScore(): number;
	    setMaxScore(score: number): void;
	    getMinScore(): number;
	    setMinScore(score: number): void;
	    getScore(): any;
	    getStartTime(): any;
	    getEndTime(): any;
	    abstract initialize(): boolean;
	    abstract complete(score?: number): boolean;
	    abstract finish(): boolean;
	    abstract setDataToStore(data: string): void;
	    abstract getDataStored(): string;
	    calculateDuration(startTime: number, endTime: number): string;
	    getDataFromUrl(): {
	        unitId: any;
	        activityId: any;
	        resourceId: any;
	    };
	    trace(msg: string): void;
	    makeBoolean(string: string): boolean;
	}

	import { TraceabilityApiContract } from './traceability-api.contract';
	import { AxiosInstance } from 'axios';
	export class TraceabilityApiFactory {
	    private http;
	    constructor(http: AxiosInstance);
	    factoryMethod(): TraceabilityApiContract;
	}

	import { TraceabilityApiContract } from './traceability-api.contract';
	import { AxiosInstance } from 'axios';
	export class WebcontentAPI extends TraceabilityApiContract {
	    protected http: AxiosInstance;
	    constructor(http: AxiosInstance);
	    initialize(): boolean;
	    complete(score?: number): boolean;
	    finish(): boolean;
	    setDataToStore(data: string): void;
	    getDataStored(): string;
	}

}