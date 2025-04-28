// src/features/RodoAssessment/RodoAssessment.jsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import RodoAssessmentForm from './components/RodoAssessmentForm';

const RodoAssessment = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Ocena Zgodności RODO
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Wypełnij poniższy formularz, aby przeprowadzić ocenę zgodności z RODO dla wybranego procesu lub systemu.
        </Typography>
        {/* Komponent formularza zostanie dodany tutaj */}
        <RodoAssessmentForm />
      </Box>
    </Container>
  );
};

export default RodoAssessment;
