import React from 'react';
import { useNavigate } from 'react-router';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  PlusCircle, Trash2, X, ArrowRight,
  FileJson, Code, List, Tag, Building,
  Lightbulb, AlertCircle
} from 'lucide-react';

const ProblemDifficulty = {
  Basic: 'Basic',
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
};

const problemTags = [
  "strings", "arrays", "linked-list", "stacks", "queues", "hash-maps", "sorting",
  "searching", "binary-search", "graphs", "trees", "dynamic-programming", "backtrack",
  "greedy", "heap", "bit-manipulation", "mathematical", "two-pointers",
  "sliding-window", "recursion", "design", "math", "other"
];

const codeLanguages = ["javascript", "python", "cpp", "java"];

const CreateProblem = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      title: '',
      problemNo: undefined,
      description: '',
      difficulty: "easy",
      tags: [],
      companies: [],
      hints: [],
      constraints: [{ value: '' }],
      starterCode: [],
      referenceSolution: [],
      visibleTestCases: [],
      hiddenTestCases: [],
    }
  });

  const tags = watch('tags');

  const { fields: constraintFields, append: appendConstraint, remove: removeConstraint } = useFieldArray({ control, name: 'constraints' });
  const { fields: companyFields, append: appendCompany, remove: removeCompany } = useFieldArray({ control, name: 'companies' });
  const { fields: hintFields, append: appendHint, remove: removeHint } = useFieldArray({ control, name: 'hints' });
  const { fields: visibleTCFields, append: appendVisibleTC, remove: removeVisibleTC } = useFieldArray({ control, name: 'visibleTestCases' });
  const { fields: hiddenTCFields, append: appendHiddenTC, remove: removeHiddenTC } = useFieldArray({ control, name: 'hiddenTestCases' });
  const { fields: starterCodeFields, append: appendStarterCode, remove: removeStarterCode } = useFieldArray({ control, name: 'starterCode' });
  const { fields: refSolutionFields, append: appendRefSolution, remove: removeRefSolution } = useFieldArray({ control, name: 'referenceSolution' });

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setValue('tags', [...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setValue('tags', tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = (data) => {
    console.log("Problem Data:", data);
    alert('Problem created! Check the console for the data.');
    navigate('/problems');
  };

  // Classname replacements
  const inputBaseClasses = "w-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-lg p-2.5 focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]/50 outline-none transition duration-200 placeholder:text-[#64748B]/60 dark:placeholder:text-[#94A3B8]/60";
  const labelClasses = "block text-sm font-medium mb-1.5 text-[#64748B] dark:text-[#94A3B8]";
  const sectionClasses = "bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm";
  const sectionTitleClasses = "flex items-center space-x-3 text-xl font-bold border-b border-[#E2E8F0] dark:border-[#334155] pb-4 mb-6 text-[#0F172A] dark:text-[#F8FAFC]";
  const subCardClasses = "p-4 bg-[#F1F5F9] dark:bg-[#0F172A] rounded-xl border border-[#E2E8F0] dark:border-[#334155]/50 transition-all duration-300 hover:border-[#F97316]/30";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* Section 1: Basic Information */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><List size={24} className="text-[#F97316]" /><span>Basic Information</span></h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className={labelClasses}>Title</label>
              <input type="text" id="title" {...register('title', { required: 'Title is required' })} className={inputBaseClasses} placeholder="e.g., Two Sum" />
              {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="problemNo" className={labelClasses}>Problem Number</label>
              <input type="number" id="problemNo" {...register('problemNo', { required: 'Problem number is required', valueAsNumber: true })} min="1" className={inputBaseClasses} placeholder="e.g., 1" />
              {errors.problemNo && <p className={errorClasses}>{errors.problemNo.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="difficulty" className={labelClasses}>Difficulty</label>
            <select id="difficulty" {...register('difficulty')} className={inputBaseClasses}>
              {Object.values(ProblemDifficulty).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="description" className={labelClasses}>Description (Markdown supported)</label>
            <textarea id="description" {...register('description', { required: 'Description is required' })} className={`${inputBaseClasses} min-h-[150px]`} placeholder="Describe the problem in detail..." />
            {errors.description && <p className={errorClasses}>{errors.description.message}</p>}
          </div>
        </div>
      </div>

      {/* Section 2: Metadata */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><Tag size={24} className="text-[#F97316]" /><span>Metadata</span></h2>
        <div className="space-y-8">
          <div>
            <label htmlFor="tags" className={labelClasses}>Tags</label>
            <select onChange={e => { handleAddTag(e.target.value); e.target.value = ''; }} className={inputBaseClasses} defaultValue="">
              <option value="" disabled>Select a tag to add...</option>
              {problemTags.filter(t => !tags.includes(t)).map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
            <div className={`flex flex-wrap items-center gap-2 mt-3 p-2 min-h-[42px] rounded-lg ${inputBaseClasses} bg-[#F1F5F9] dark:bg-[#0F172A]`}>
              {tags?.length > 0 ? tags.map(tag => (
                <div key={tag} className="flex items-center gap-1.5 bg-[#F97316]/20 text-[#F97316] text-sm font-medium px-2.5 py-1 rounded-full">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-[#F97316] hover:bg-white/20 rounded-full p-0.5"><X size={14} /></button>
                </div>
              )) : <span className="text-sm text-[#64748B] dark:text-[#94A3B8] px-1">No tags selected.</span>}
            </div>
          </div>

          {/* Dynamic Sections: Constraints, Companies, Hints */}
          {[
            { label: 'Constraints', fields: constraintFields, append: () => appendConstraint({ value: '' }), remove: removeConstraint, icon: <AlertCircle size={20} />, placeholder: 'e.g., 2 <= nums.length <= 10^4', name: 'constraints' },
            { label: 'Companies', fields: companyFields, append: () => appendCompany({ value: '' }), remove: removeCompany, icon: <Building size={20} />, placeholder: 'e.g., Google', name: 'companies' },
            { label: 'Hints', fields: hintFields, append: () => appendHint({ value: '' }), remove: removeHint, icon: <Lightbulb size={20} />, placeholder: 'e.g., Consider using a hash map', name: 'hints' }
          ].map(({ label, fields, append, remove, icon, placeholder, name }) => (
            <div key={label}>
              <h3 className="flex items-center space-x-2 text-md font-semibold mb-3 text-[#0F172A] dark:text-[#F8FAFC]">{icon}<span>{label}</span></h3>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input {...register(`${name}.${index}.value`)} className={inputBaseClasses} placeholder={`${placeholder} #${index + 1}`} />
                    <button type="button" onClick={() => remove(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => append()} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]">
                <PlusCircle size={18} />
                <span>Add {label.slice(0, -1)}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Test Cases */}
      {/* (Use updated Part 4 code here) */}

      {/* Section 4: Code Snippets */}
      {/* (Use updated Part 5 code here) */}

      {/* Final Buttons */}
      <div className="flex justify-end items-center space-x-4 pt-4">
        <button type="button" onClick={() => navigate(-1)} className="py-2.5 px-5 rounded-lg font-semibold text-sm border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0]/50 dark:hover:bg-[#334155]/50 transition-colors">Cancel</button>
        <button type="submit" className="group flex items-center space-x-2 py-3 px-6 rounded-lg bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#FB923C] hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
          <span>Create Problem</span>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
};

export default CreateProblem;
