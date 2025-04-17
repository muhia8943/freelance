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
exports.JobService = void 0;
const sql_config_1 = require("../config/sql.config");
const sql = __importStar(require("mssql"));
class JobService {
    createJob(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            yield pool.request()
                .input('client_id', sql.Int, job.client_id)
                .input('title', sql.NVarChar, job.title)
                .input('description', sql.Text, job.description)
                .input('required_skills', sql.Text, job.required_skills)
                .input('budget', sql.Decimal(10, 2), job.budget)
                .input('deadline', sql.Date, job.deadline)
                .input('coverPhoto', sql.NVarChar, job.coverPhoto) // Added coverPhoto
                .execute('spCreateJob');
        });
    }
    getJobById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request()
                .input('id', sql.Int, id)
                .execute('spGetJobById');
            return result.recordset.length > 0 ? result.recordset[0] : null;
        });
    }
    getAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request().execute('spGetAllJobs');
            return result.recordset;
        });
    }
    updateJob(id, updatedJob) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            yield pool.request()
                .input('id', sql.Int, id)
                .input('title', sql.NVarChar, updatedJob.title)
                .input('description', sql.Text, updatedJob.description)
                .input('required_skills', sql.Text, updatedJob.required_skills)
                .input('budget', sql.Decimal(10, 2), updatedJob.budget)
                .input('deadline', sql.Date, updatedJob.deadline)
                .input('status', sql.NVarChar, updatedJob.status)
                .input('coverPhoto', sql.NVarChar, updatedJob.coverPhoto) // Added coverPhoto
                .execute('spUpdateJob');
        });
    }
    deleteJob(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            yield pool.request()
                .input('id', sql.Int, id)
                .execute('spDeleteJob');
        });
    }
    getJobsByClientId(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request()
                .input('client_id', sql.Int, clientId)
                .execute('spGetJobsByClientId');
            return result.recordset;
        });
    }
    // ✅ Function to get completed jobs
    getCompletedJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request().execute('spGetCompletedJobs');
            console.log("Completed Jobs:", result.recordset); // ✅ Add logging
            return result.recordset;
        });
    }
    getCompletedJobsByClientId(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request()
                .input('client_id', sql.Int, clientId)
                .execute('spGetCompletedJobsByClientId');
            return result.recordset;
        });
    }
    getCompletedJobsByFreelancerId(freelancerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield sql_config_1.poolPromise;
            const result = yield pool.request()
                .input('completed_by', sql.Int, freelancerId)
                .execute('spGetCompletedJobsByFreelancerId');
            return result.recordset;
        });
    }
}
exports.JobService = JobService;
