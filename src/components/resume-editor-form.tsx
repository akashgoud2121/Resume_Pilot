
'use client';

import React, { useEffect } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ResumeData } from '@/lib/types';
import { resumeSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Trash2, PlusCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface ResumeEditorFormProps {
  initialData: ResumeData;
  onFormChange: (data: ResumeData) => void;
}

export function ResumeEditorForm({ initialData, onFormChange }: ResumeEditorFormProps) {
  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: 'experience',
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: 'education',
  });
  
  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: 'coreSkills',
  });
  
  const { fields: projectsFields, append: appendProject, remove: removeProject } = useFieldArray({
    control: form.control,
    name: 'projects',
  });
  
  const { fields: achievementsFields, append: appendAchievement, remove: removeAchievement } = useFieldArray({
    control: form.control,
    name: 'achievements',
  });

  const { fields: certificationsFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control: form.control,
    name: 'certifications',
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      onFormChange(value as ResumeData);
    });
    return () => subscription.unsubscribe();
  }, [form, onFormChange]);
  
  useEffect(() => {
    form.reset(initialData);
  }, [initialData, form]);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form className="space-y-6 p-4">
          <Accordion type="multiple" defaultValue={['personal', 'experience', 'education']} className="w-full">
            
            <AccordionItem value="personal">
              <AccordionTrigger className="text-lg font-semibold">Personal Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="Alexandria Quill" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                   <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input placeholder="alex.quill@email.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl><Input placeholder="555-123-4567" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <FormField
                      control={form.control}
                      name="linkedinLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="githubLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="professionalSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Summary</FormLabel>
                        <FormControl><Textarea placeholder="A brief summary of your professional background..." {...field} rows={5} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="skills">
              <AccordionTrigger className="text-lg font-semibold">Skills</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                {skillsFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                        control={form.control}
                        name={`coreSkills.${index}.value`}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                            <FormControl><Input placeholder="e.g. React" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ id: `${Date.now()}`, value: '' })}>
                  <PlusCircle className="mr-2" /> Add Skill
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience">
              <AccordionTrigger className="text-lg font-semibold">Work Experience</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2">
                {experienceFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                    <FormField
                        control={form.control}
                        name={`experience.${index}.title`}
                        render={({ field }) => (
                            <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="Senior Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="Innovatech" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`experience.${index}.dates`} render={({ field }) => (<FormItem><FormLabel>Dates</FormLabel><FormControl><Input placeholder="2020 - Present" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={form.control} name={`experience.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe your responsibilities and achievements..." {...field} rows={4}/></FormControl><FormMessage /></FormItem>)} />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeExperience(index)} className="absolute top-2 right-2"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendExperience({ id: `${Date.now()}`, title: '', company: '', dates: '', description: '' })}>
                  <PlusCircle className="mr-2" /> Add Experience
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education">
              <AccordionTrigger className="text-lg font-semibold">Education</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2">
                {educationFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                    <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => (<FormItem><FormLabel>Institution</FormLabel><FormControl><Input placeholder="University of Technology" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree</FormLabel><FormControl><Input placeholder="B.S. in Computer Science" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`education.${index}.dates`} render={({ field }) => (<FormItem><FormLabel>Dates</FormLabel><FormControl><Input placeholder="2018 - 2022" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(index)} className="absolute top-2 right-2"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendEducation({ id: `${Date.now()}`, institution: '', degree: '', dates: '' })}>
                  <PlusCircle className="mr-2" /> Add Education
                </Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="projects">
              <AccordionTrigger className="text-lg font-semibold">Projects</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-2">
                {projectsFields.map((field, index) => (
                  <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                    <FormField control={form.control} name={`projects.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="e.g., Portfolio Website" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe the project..." {...field} rows={3}/></FormControl><FormMessage /></FormItem>)} />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeProject(index)} className="absolute top-2 right-2"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendProject({ id: `${Date.now()}`, name: '', description: '' })}>
                  <PlusCircle className="mr-2" /> Add Project
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="achievements">
              <AccordionTrigger className="text-lg font-semibold">Achievements</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                {achievementsFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField control={form.control} name={`achievements.${index}.value`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input placeholder="e.g., 'Innovator of the Year' Award" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeAchievement(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendAchievement({ id: `${Date.now()}`, value: '' })}>
                  <PlusCircle className="mr-2" /> Add Achievement
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="certifications">
              <AccordionTrigger className="text-lg font-semibold">Certifications</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                {certificationsFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                     <FormField control={form.control} name={`certifications.${index}.value`} render={({ field }) => (<FormItem className="flex-1"><FormControl><Input placeholder="e.g., AWS Certified Developer" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeCertification(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendCertification({ id: `${Date.now()}`, value: '' })}>
                  <PlusCircle className="mr-2" /> Add Certification
                </Button>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </form>
      </Form>
    </FormProvider>
  );
}
