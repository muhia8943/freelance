"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCompletionService = void 0;
const sql_config_1 = require("../config/sql.config");
const sql = __importStar(require("mssql"));
class JobCompletionService {
    // Freelancer submits completed work
    submitWork(jobId, freelancerId, submissionLink, notes) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            yield pool.request()
                .input('job_id', sql.Int, jobId)
                .input('freelancer_id', sql.Int, freelancerId)
                .input('submission_link', sql.NVarChar, submissionLink)
                .input('notes', sql.Text, notes)
                .execute('spSubmitJobWork');
        });
    }
    // Client approves work & marks job as completed
    approveWork(submissionId, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            yield pool.request()
                .input('submission_id', sql.Int, submissionId)
                .input('client_id', sql.Int, clientId)
                .execute('spApproveJobWork');
        });
    }
    // Client rejects work
    rejectWork(submissionId, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            yield pool.request()
                .input('submission_id', sql.Int, submissionId)
                .input('reason', sql.Text, reason)
                .execute('spRejectJobWork');
        });
    }
    // Get all job submissions
    getAllSubmissions() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request().query('SELECT * FROM JobSubmissions');
            return result.recordset;
        });
    }
    // Get submissions by job ID
    getSubmissionsByJobId(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request()
                .input('job_id', sql.Int, jobId)
                .query('SELECT * FROM JobSubmissions WHERE job_id = @job_id');
            return result.recordset;
        });
    }
    rateCompletedJob(jobId, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            if (rating < 1.0 || rating > 5.0) {
                throw new Error("Rating must be between 1.0 and 5.0");
            }
            yield pool.request()
                .input('rating', sql.Decimal(2, 1), rating)
                .input('job_id', sql.Int, jobId)
                .query('UPDATE Jobs SET ratings = @rating WHERE id = @job_id');
        });
    }
}
exports.JobCompletionService = JobCompletionService;
