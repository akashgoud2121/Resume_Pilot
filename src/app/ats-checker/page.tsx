
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { calculateAtsScoreAction } from '../actions';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Pie, PieChart } from 'recharts';
import { Textarea } from '@/components/ui/textarea';
import type { AtsScoreData } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

const chartConfig = {
    score: { label: 'Score', color: 'hsl(var(--primary))' },
    rest: { label: 'Rest' },
} satisfies ChartConfig;

export default function AtsCheckerPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [resumeText, setResumeText] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [atsData, setAtsData] = useState<AtsScoreData | null>(null);

    useEffect(() => {
        let textToProcess = '';
        try {
            const stateFromHistory = history.state as { resumeText?: string };
            if (stateFromHistory?.resumeText) {
                textToProcess = stateFromHistory.resumeText;
            } else {
                const storedText = sessionStorage.getItem('resumeText');
                if (storedText) {
                    textToProcess = storedText;
                }
            }

            if (textToProcess) {
                setResumeText(textToProcess);
                handleAtsCheck(textToProcess);
            } else {
                toast({
                    title: 'No resume text found',
                    description: 'Please go back and upload your resume again.',
                    variant: 'destructive',
                });
                router.push('/');
            }
        } catch (error) {
            console.error("Failed to load resume text:", error);
            toast({
                title: "Error Loading Data",
                description: "Could not load your resume text. Please try again.",
                variant: "destructive",
            });
            router.push('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, toast]);

    const handleAtsCheck = async (text: string) => {
        if (!text.trim()) {
            toast({
                title: 'Empty Text',
                description: 'The resume text is empty and cannot be processed.',
                variant: 'destructive',
            });
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            const result = await calculateAtsScoreAction(text);
            setAtsData(result);
        } catch (e: any) {
            console.error("Failed to calculate ATS score:", e);
            toast({
                title: 'Calculation Failed',
                description: e.message || "We couldn't calculate the ATS score for the provided text. Please try again.",
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const chartData = atsData ? [
        { name: 'score', value: atsData.atsScore, fill: 'var(--color-score)' },
        { name: 'rest', value: 100 - atsData.atsScore, fill: 'hsl(var(--primary) / 0.1)' },
    ] : [];


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
             <Card className="w-full max-w-6xl shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-center">ATS Score Checker</CardTitle>
                    <CardDescription className="text-muted-foreground text-center max-w-2xl mx-auto pt-2">
                        Our AI has analyzed your resume against common Applicant Tracking System criteria. Here are the results.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-12 gap-8">
                     {isLoading ? (
                        <div className="md:col-span-12 flex flex-col items-center justify-center min-h-[400px]">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            <p className="mt-4 text-lg text-muted-foreground">Calculating your ATS Score...</p>
                        </div>
                    ) : atsData && (
                        <>
                            <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                                <ChartContainer config={chartConfig} className="w-full aspect-square max-w-[250px] mx-auto">
                                    <PieChart>
                                        <defs>
                                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--color-score)" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0.2} />
                                            </linearGradient>
                                        </defs>
                                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={100} startAngle={90} endAngle={90 + (atsData.atsScore / 100) * 360} cornerRadius={5} paddingAngle={-10}>
                                            <cell key="score" fill="url(#scoreGradient)" stroke="var(--color-score)" />
                                            <cell key="rest" fill="transparent" stroke="transparent" />
                                        </Pie>
                                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-5xl font-bold transition-all duration-1000">
                                            {atsData.atsScore}
                                        </text>
                                        <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-sm font-medium">
                                            ATS Score
                                        </text>
                                    </PieChart>
                                </ChartContainer>
                                <p className="mt-4 text-muted-foreground text-sm max-w-xs">This score represents how well your resume is likely to be parsed and ranked by automated systems.</p>
                            </div>

                            <div className="md:col-span-8">
                                <div className="grid grid-rows-2 gap-4 h-full">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg text-foreground">AI Feedback for Improvement</h3>
                                        <Card className="bg-muted/50 h-full">
                                             <ScrollArea className="h-[200px] p-4">
                                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{atsData.feedback}</p>
                                             </ScrollArea>
                                        </Card>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg text-foreground">Original Resume Text</h3>
                                        <Textarea
                                            value={resumeText}
                                            readOnly
                                            className="w-full h-full min-h-[200px] text-xs font-mono bg-muted/50 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
