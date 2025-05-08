import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
  Slider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Sparkles from '@mui/icons-material/AutoAwesome';
import { Button } from '@/components/ui/button';
import { useQuery } from '@apollo/client';
import { GET_REPORT } from '@/graphql/report';

const REPORT_TYPES = ['internal-report', 'misp-event', 'threat-report'];
const RELIABILITY_OPTIONS = [
  'A - Completely reliable',
  'B - Usually reliable',
  'C - Fairly reliable',
  'D - Not usually reliable',
  'E - Unreliable',
  'F - Reliability cannot be judged',
];
const CONFIDENCE_LEVELS = [
  { value: 100, label: '1 - Confirmed by other sources' },
  { value: 80, label: '2 - Probably True' },
  { value: 60, label: '3 - Possibly True' },
  { value: 40, label: '4 - Doubtful' },
  { value: 20, label: '5 - Improbable' },
  { value: 0, label: '6 - Truth Cannot be judged' },
];
const MARKING_LABELS = [
  'TLP:CLEAR',
  'TLP:GREEN',
  'TLP:AMBER+STRICT',
  'TLP:AMBER',
  'TLP:RED',
];

export const ReportsEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_REPORT, { variables: { id } });

  const [values, setValues] = useState({
    name: '',
    published: '',
    report_types: [],
    reliability: '',
    confidence: 100,
    confidenceLevel: CONFIDENCE_LEVELS[0].label,
    description: '',
    markingLabels: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Populate form with real data when loaded
  useEffect(() => {
    if (data?.report) {
      const report = data.report;
      setValues({
        name: report.name || '',
        published: report.published ? report.published.slice(0, 10) : '',
        report_types: report.report_types || [],
        reliability: report.reliability || '',
        confidence: typeof report.confidence === 'number' ? report.confidence : 100,
        confidenceLevel:
          CONFIDENCE_LEVELS.find(l => l.value === report.confidence)?.label ||
          CONFIDENCE_LEVELS[0].label,
        description: report.description || '',
        markingLabels: report.object_marking_refs || [],
      });
    }
  }, [data]);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = 'This field is required';
    if (!values.published) newErrors.published = 'This field is required';
    if (!values.report_types.length) newErrors.report_types = 'This field is required';
    if (!values.reliability) newErrors.reliability = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // submit update logic here
  };

  const getConfidenceLabel = (val: number) => {
    for (let i = 0; i < CONFIDENCE_LEVELS.length; i++) {
      if (val >= CONFIDENCE_LEVELS[i].value) return CONFIDENCE_LEVELS[i].label;
    }
    return CONFIDENCE_LEVELS[CONFIDENCE_LEVELS.length - 1].label;
  };

  const getConfidenceValue = (label: string) => {
    const found = CONFIDENCE_LEVELS.find((l) => l.label === label);
    return found ? found.value : 0;
  };

  const getSliderColor = (val: number) => {
    if (val >= 80) return '#43a047';
    if (val >= 60) return '#b2ff59';
    if (val >= 40) return '#ffee58';
    if (val >= 20) return '#ffa726';
    return '#ef5350';
  };

  const handleConfidenceChange = (field: 'confidence' | 'confidenceLevel', value: number | string) => {
    if (field === 'confidence') {
      const num = typeof value === 'number' ? value : parseInt(value as string, 10);
      setValues((prev) => ({
        ...prev,
        confidence: num,
        confidenceLevel: getConfidenceLabel(num),
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        confidenceLevel: value as string,
        confidence: getConfidenceValue(value as string),
      }));
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        Loading...
      </Box>
    );
  }
  if (error || !data?.report) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        Failed to load report.
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate(-1)}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Update a report
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
        <FormControl fullWidth margin="normal" error={!!errors.name}>
          <InputLabel required shrink>Name</InputLabel>
          <OutlinedInput
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
            startAdornment={<Sparkles sx={{ color: 'purple', mr: 1 }} />}
            label="Name"
          />
          {errors.name && (
            <FormHelperText>{errors.name}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.published}>
          <InputLabel required shrink>Publication date</InputLabel>
          <TextField
            type="date"
            value={values.published}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('published', e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={!!errors.published}
            helperText={errors.published}
            label="Publication date"
          />
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.report_types}>
          <InputLabel required shrink>Report types</InputLabel>
          <Select
            multiple
            value={values.report_types}
            onChange={(e) => handleChange('report_types', e.target.value)}
            input={<OutlinedInput label="Report types" />}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {REPORT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          {errors.report_types && (
            <FormHelperText>{errors.report_types}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.reliability}>
          <InputLabel required shrink>Reliability</InputLabel>
          <Select
            value={values.reliability}
            onChange={(e) => handleChange('reliability', e.target.value)}
            input={<OutlinedInput label="Reliability" />}
            displayEmpty
          >
            {RELIABILITY_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {errors.reliability && (
            <FormHelperText>{errors.reliability}</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel shrink>Confidence level</InputLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              type="number"
              label=""
              value={values.confidence}
              inputProps={{ min: 0, max: 100 }}
              onChange={(e) => handleConfidenceChange('confidence', Number(e.target.value))}
              sx={{ width: 80 }}
            />
            <Select
              value={values.confidenceLevel}
              onChange={(e) => handleConfidenceChange('confidenceLevel', e.target.value)}
              sx={{ minWidth: 260 }}
            >
              {CONFIDENCE_LEVELS.map((level) => (
                <MenuItem key={level.label} value={level.label}>
                  {level.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ px: 1, pt: 2 }}>
            <Slider
              min={0}
              max={100}
              step={1}
              value={values.confidence}
              onChange={(_, val) => handleConfidenceChange('confidence', val as number)}
              sx={{
                color: getSliderColor(values.confidence),
                height: 4,
              }}
            />
          </Box>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel shrink>Description</InputLabel>
          <TextField
            multiline
            minRows={4}
            value={values.description}
            onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Write a description in markdown..."
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel shrink>Markings</InputLabel>
          <Select
            multiple
            value={values.markingLabels}
            onChange={(e) => handleChange('markingLabels', e.target.value)}
            input={<OutlinedInput label="Markings" />}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {MARKING_LABELS.map((label) => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={3}>
          <Button type="submit" variant="default" color="primary">
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
