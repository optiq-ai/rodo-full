// src/features/RodoAssessment/components/RodoAssessmentForm.jsx
import React, { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Button, Paper, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Checkbox, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Placeholder danych formularza - struktura oparta na analizie Excela
// W rzeczywistej implementacji dane te pochodziłyby z API lub konfiguracji
const formStructure = [
  {
    category_id: 'I.',
    title: 'Zgodność przetwarzania z prawem',
    questions: [
      {
        id: 'I._1',
        text: 'Czy określono podstawę prawną przetwarzania danych osobowych?',
        type: 'radio',
        options: ['Tak', 'Nie', 'Nie dotyczy'],
        requires_justification: true,
        reference: 'Art. 6 ust. 1 RODO'
      },
      {
        id: 'I._2',
        text: 'Czy w przypadku przetwarzania danych na podstawie zgody, spełniono warunki wyrażenia zgody?',
        type: 'radio',
        options: ['Tak', 'Nie', 'Nie dotyczy'],
        requires_justification: true,
        reference: 'Art. 7 RODO'
      },
      // ... więcej pytań dla tej kategorii
    ]
  },
  {
    category_id: 'II.',
    title: 'Prawa osób, których dane dotyczą',
    questions: [
      {
        id: 'II._1',
        text: 'Czy zapewniono przejrzyste informowanie i przejrzystą komunikację?',
        type: 'radio',
        options: ['Tak', 'Nie', 'Nie dotyczy'],
        requires_justification: true,
        reference: 'Art. 12 RODO'
      },
      {
        id: 'II._2',
        text: 'Czy realizowany jest obowiązek informacyjny przy zbieraniu danych od osoby, której dane dotyczą?',
        type: 'radio',
        options: ['Tak', 'Nie', 'Nie dotyczy'],
        requires_justification: true,
        reference: 'Art. 13 RODO'
      },
      // ... więcej pytań dla tej kategorii
    ]
  },
  // ... więcej kategorii (III-VII) na podstawie analizy Excela
  {
    category_id: 'VII.',
    title: 'Ocena ogólna',
    questions: [
      {
        id: 'VII._1',
        text: 'Podsumowująca ocena ogólna systemu ochrony danych osobowych.',
        type: 'textarea',
        options: [],
        requires_justification: false,
        reference: ''
      }
    ]
  }
];

const RodoAssessmentForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({}); // Stan formularza
  const [expanded, setExpanded] = useState(formStructure[0]?.category_id || false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (categoryId, questionId, value, isJustification = false) => {
    setFormData(prevData => ({
      ...prevData,
      [categoryId]: {
        ...prevData[categoryId],
        [questionId]: {
          ...(prevData[categoryId]?.[questionId]),
          [isJustification ? 'justification' : 'answer']: value
        }
      }
    }));
  };

  const handleNext = () => {
    // Logika walidacji kroku (jeśli potrzebna)
    // Przejście do następnego kroku lub zapis danych
    if (activeStep < formStructure.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setExpanded(formStructure[activeStep + 1]?.category_id || false); // Rozwiń następną sekcję
    } else {
      // Logika zapisu formularza
      console.log('Zapisywanie formularza:', formData);
      // Placeholder dla wywołania API zapisu
      // api.saveRodoAssessment(formData).then(...);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setExpanded(formStructure[activeStep - 1]?.category_id || false); // Rozwiń poprzednią sekcję
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {formStructure.map((category) => (
          <Step key={category.category_id}>
            <StepLabel>{category.title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        {formStructure.map((category, index) => (
          <Accordion 
            key={category.category_id} 
            expanded={expanded === category.category_id}
            onChange={handleAccordionChange(category.category_id)}
            disabled={index !== activeStep} // Aktywna tylko bieżąca sekcja
            sx={{ 
              '&.Mui-disabled': { 
                backgroundColor: 'action.disabledBackground', 
                opacity: 0.7 
              },
              mb: 2
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${category.category_id}-content`}
              id={`${category.category_id}-header`}
            >
              <Typography variant="h6">{`${category.category_id} ${category.title}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {category.questions.map((question) => (
                  <Grid item xs={12} key={question.id}>
                    <FormControl component="fieldset" fullWidth margin="normal">
                      <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
                        {question.text}
                        {question.reference && (
                          <Typography variant="caption" display="block" color="text.secondary">
                            ({question.reference})
                          </Typography>
                        )}
                      </FormLabel>
                      
                      {question.type === 'radio' && (
                        <RadioGroup
                          row
                          aria-label={question.id}
                          name={question.id}
                          value={formData[category.category_id]?.[question.id]?.answer || ''}
                          onChange={(e) => handleInputChange(category.category_id, question.id, e.target.value)}
                        >
                          {question.options.map((option) => (
                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                          ))}
                        </RadioGroup>
                      )}

                      {question.type === 'checkbox' && (
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={!!formData[category.category_id]?.[question.id]?.answer}
                              onChange={(e) => handleInputChange(category.category_id, question.id, e.target.checked)}
                            />
                          }
                          label={question.text} // Lub inny label jeśli potrzebny
                        />
                      )}

                      {question.type === 'textarea' && (
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          label="Odpowiedź / Opis"
                          value={formData[category.category_id]?.[question.id]?.answer || ''}
                          onChange={(e) => handleInputChange(category.category_id, question.id, e.target.value)}
                        />
                      )}

                      {question.requires_justification && (
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          variant="outlined"
                          label="Uzasadnienie / Uwagi"
                          value={formData[category.category_id]?.[question.id]?.justification || ''}
                          onChange={(e) => handleInputChange(category.category_id, question.id, e.target.value, true)}
                          sx={{ mt: 2 }}
                          placeholder="Wprowadź uzasadnienie lub uwagi (jeśli dotyczy)"
                        />
                      )}
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Wstecz
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
        >
          {activeStep === formStructure.length - 1 ? 'Zakończ Ocenę' : 'Dalej'}
        </Button>
      </Box>
    </Paper>
  );
};

export default RodoAssessmentForm;
