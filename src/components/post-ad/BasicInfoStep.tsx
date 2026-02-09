import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { usePostAd } from './PostAdContext'
import {
  FiArrowLeft,
  FiArrowRight,
  FiInfo,
  FiMapPin,
  FiShield,
  FiZap,
  FiCreditCard,
} from 'react-icons/fi'
import { FaPencilRuler } from 'react-icons/fa'
import './post-ad.css'

// Validation rules for Step 1 inputs.
const basicInfoSchema = z.object({
  propertyType: z.string().min(1, 'Select a property type'),
  transactionType: z.enum(['sale', 'rent']),
  askingPrice: z.preprocess(
    (value) => (value === '' || value === null ? undefined : Number(value)),
    z
      .number({ invalid_type_error: 'Enter a valid number' })
      .positive('Asking price is required')
      .finite('Enter a valid number'),
  ),
  areaSqm: z.preprocess(
    (value) => (value === '' || value === null ? undefined : Number(value)),
    z
      .number({ invalid_type_error: 'Enter a valid number' })
      .positive('Square meters is required')
      .finite('Enter a valid number'),
  ),
  address: z.string().min(5, 'Enter a full address'),
})

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>

type Option = {
  label: string
  value: string
}

type InputFieldProps = {
  label: string
  name: keyof BasicInfoFormData
  register: ReturnType<typeof useForm<BasicInfoFormData>>['register']
  error?: string
  type?: string
  placeholder?: string
  hint?: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

function InputField({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  hint,
  startAdornment,
  endAdornment,
}: InputFieldProps) {
  return (
    <div className="pa-field">
      <label className="pa-label">{label}</label>
      <div className="pa-input-wrap">
        {startAdornment ? (
          <div className="pa-input-adornment pa-input-adornment--left">
            {startAdornment}
          </div>
        ) : null}
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          inputMode={type === 'number' ? 'numeric' : undefined}
          className={`pa-input ${startAdornment ? 'pa-input--pl' : ''} ${
            endAdornment ? 'pa-input--pr' : ''
          } ${error ? 'pa-input--error' : ''}`}
        />
        {endAdornment ? (
          <div className="pa-input-adornment pa-input-adornment--right">
            {endAdornment}
          </div>
        ) : null}
      </div>
      {error ? (
        <p className="pa-error">{error}</p>
      ) : hint ? (
        <p className="pa-hint">{hint}</p>
      ) : null}
    </div>
  )
}

type SelectFieldProps = {
  label: string
  name: keyof BasicInfoFormData
  register: ReturnType<typeof useForm<BasicInfoFormData>>['register']
  error?: string
  placeholder?: string
  options: Option[]
}

function SelectField({
  label,
  name,
  register,
  error,
  placeholder,
  options,
}: SelectFieldProps) {
  return (
    <div className="pa-field">
      <label className="pa-label">{label}</label>
      <select
        {...register(name)}
        className={`pa-input pa-select ${error ? 'pa-input--error' : ''}`}
      >
        <option value="">{placeholder ?? 'Select option'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="pa-error">{error}</p> : null}
    </div>
  )
}

type ToggleGroupProps = {
  label: string
  value: BasicInfoFormData['transactionType']
  onChange: (value: BasicInfoFormData['transactionType']) => void
}

function ToggleGroup({ label, value, onChange }: ToggleGroupProps) {
  return (
    <div className="pa-field">
      <label className="pa-label">{label}</label>
      <div className="pa-toggle">
        {(
          [
            { label: 'For Sale', value: 'sale' },
            { label: 'For Rent', value: 'rent' },
          ] as const
        ).map((option) => {
          const isActive = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`pa-toggle__btn ${
                isActive ? 'pa-toggle__btn--active' : ''
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

type StepProgressProps = {
  currentStep: number
  steps: string[]
}

// Step progress header + bar.
function StepProgress({ currentStep, steps }: StepProgressProps) {
  const percent = Math.round(((currentStep + 1) / steps.length) * 100)

  return (
    <div className="pa-progress">
      <div className="pa-progress__head">
        <div>
          <h2 className="pa-title">Post an Ad</h2>
          <p className="pa-subtitle">Step 1: Basic Information</p>
        </div>
        <span className="pa-progress__percent">
          {percent}% Completed
        </span>
      </div>
      <div className="pa-progress__bar">
        <div
          className="pa-progress__bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="pa-progress__steps">
        {steps.map((step, index) => (
          <span
            key={step}
            className={index === currentStep ? 'is-active' : undefined}
          >
            {index + 1}. {step}
          </span>
        ))}
      </div>
    </div>
  )
}

type CardProps = {
  children: ReactNode
  className?: string
}

function Card({ children, className }: CardProps) {
  return (
    <div className={`pa-card ${className ?? ''}`}>{children}</div>
  )
}

const propertyTypeOptions: Option[] = [
  { label: 'Apartment', value: 'apartment' },
  { label: 'Detached House', value: 'house' },
  { label: 'Villa', value: 'villa' },
  { label: 'Commercial Space', value: 'commercial' },
  { label: 'Land / Plot', value: 'land' },
]

// Static samples to emulate autocomplete behavior.
const addressSamples = [
  '123 Market Street, Munich, Germany',
  '45 Via Roma, Milan, Italy',
  '221B Baker Street, London, UK',
  '1200 Sunset Blvd, Los Angeles, CA',
  '8 Rue de Rivoli, Paris, France',
]

export default function BasicInfoStep() {
  const navigate = useNavigate()
  const { state, setBasicInfo } = usePostAd()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      propertyType: state.basicInfo?.propertyType ?? '',
      transactionType: state.basicInfo?.transactionType ?? 'sale',
      askingPrice: state.basicInfo?.askingPrice,
      areaSqm: state.basicInfo?.areaSqm,
      address: state.basicInfo?.address ?? '',
    },
    mode: 'onBlur',
  })

  const addressValue = watch('address')
  const transactionType = watch('transactionType')

  // Filter the sample list to mimic an autocomplete dropdown.
  const filteredAddresses = useMemo(() => {
    if (!addressValue || addressValue.length < 2) {
      return []
    }
    const query = addressValue.toLowerCase()
    return addressSamples.filter((item) => item.toLowerCase().includes(query))
  }, [addressValue])

  const onSubmit = (data: BasicInfoFormData) => {
    console.log('Basic info submitted', data)
    setBasicInfo(data)
    navigate('/create-new-property/photos')
  }

  return (
    <section className="pa-page">
      <div className="pa-container">
      <div className="pa-section">
        <StepProgress
          currentStep={0}
          steps={['Basic Info', 'Photos', 'Features', 'Review']}
        />
      </div>

      <div className="pa-layout">
        <div className="pa-main">
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="pa-grid-2">
                <SelectField
                  label="What are you listing?"
                  name="propertyType"
                  register={register}
                  placeholder="Select property type"
                  options={propertyTypeOptions}
                  error={errors.propertyType?.message}
                />
                <ToggleGroup
                  label="Transaction Type"
                  value={transactionType}
                  onChange={(value) => setValue('transactionType', value)}
                />
              </div>

              <div className="pa-grid-2 pa-divider">
                <InputField
                  label="Asking Price"
                  name="askingPrice"
                  register={register}
                  type="number"
                  placeholder="0"
                  startAdornment={<span>€</span>}
                  hint="Enter total amount including taxes if applicable."
                  error={errors.askingPrice?.message}
                />
                <InputField
                  label="Square Meters"
                  name="areaSqm"
                  register={register}
                  type="number"
                  placeholder="e.g. 120"
                  endAdornment={<span>m²</span>}
                  hint="Floor area including internal walls."
                  error={errors.areaSqm?.message}
                />
              </div>

              <div className="pa-divider pa-block">
                <div className="pa-field">
                  <label className="pa-label">
                    Property Address
                  </label>
                  <div className="pa-input-wrap">
                    <div className="pa-input-adornment pa-input-adornment--left">
                      <FiMapPin className="h-4 w-4" />
                    </div>
                    <input
                      {...register('address')}
                      placeholder="Start typing address (City, Street, Number)..."
                      className={`pa-input pa-input--pl ${
                        errors.address ? 'pa-input--error' : ''
                      }`}
                    />
                    {filteredAddresses.length > 0 ? (
                      <div className="pa-autocomplete">
                        {filteredAddresses.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setValue('address', item)}
                            className="pa-autocomplete__item"
                          >
                            <FiMapPin className="h-4 w-4 text-slate-400" />
                            {item}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  {errors.address ? (
                    <p className="pa-error">
                      {errors.address.message}
                    </p>
                  ) : null}
                </div>

                {/* Map placeholder with helper hint text. */}
                <div className="pa-map">
                  <div className="pa-map__bg" />
                  <div className="pa-map__grid" />
                  <div className="pa-map__center">
                    <div className="pa-map__pin">
                      <FiMapPin className="h-5 w-5" />
                    </div>
                    <span className="pa-map__label">
                      Map Component
                    </span>
                  </div>
                  <div className="pa-map__hint">
                    <div className="pa-map__hint-inner">
                      <span className="pa-map__info">
                        <FiInfo className="h-3 w-3" />
                      </span>
                      <p>
                        Drag the pin to adjust the exact location. This helps
                        buyers find your property on the map.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pa-actions">
                <button
                  type="button"
                  className="pa-btn pa-btn--ghost"
                >
                  <FiArrowLeft className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="pa-btn pa-btn--primary"
                >
                  Next Step
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </Card>
        </div>

        <aside className="pa-sidebar">
          <div className="pa-help">
            <div className="pa-help__head">
              <FiZap className="h-5 w-5 text-[#f83a51]" />
              <h3 className="pa-help__title">Need help?</h3>
            </div>
            <p className="pa-help__text">
              Providing accurate basic info helps our algorithm match your
              property with the right leads.
            </p>
            <ul className="pa-help__list">
              <li className="pa-help__item">
                <span className="pa-help__icon">
                  <FiCreditCard className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h4 className="pa-help__label">
                    Pricing Tip
                  </h4>
                  <p className="pa-help__desc">
                    Check similar properties in your area to set a competitive
                    price.
                  </p>
                </div>
              </li>
              <li className="pa-help__item">
                <span className="pa-help__icon">
                  <FaPencilRuler className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h4 className="pa-help__label">
                    Square Meters
                  </h4>
                  <p className="pa-help__desc">
                    Buyers filter by size. Accuracy prevents disputes during
                    viewing.
                  </p>
                </div>
              </li>
            </ul>
            <div className="pa-help__footer">
              <div className="pa-help__meta">
                <span>Estimated Time</span>
                <span className="font-bold text-white">5 mins</span>
              </div>
              <div className="pa-help__bar" aria-hidden />
            </div>
          </div>

          <div className="pa-security">
            <div className="pa-security__head">
              <FiShield className="h-5 w-5 text-[#f83a51]" />
              <h3 className="pa-security__title">Security First</h3>
            </div>
            <p className="pa-security__text">
              We don't show your exact house number until you approve a viewing
              request. Your privacy is our priority.
            </p>
            <button
              type="button"
              className="pa-security__link"
            >
              Read our privacy policy
            </button>
          </div>
        </aside>
      </div>
      </div>
    </section>
  )
}
