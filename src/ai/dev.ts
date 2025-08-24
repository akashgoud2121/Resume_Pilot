import { config } from 'dotenv';
config();

import '@/ai/flows/calculate-ats-score.ts';
import '@/ai/flows/generate-ats-feedback.ts';
import '@/ai/flows/extract-resume-data.ts';