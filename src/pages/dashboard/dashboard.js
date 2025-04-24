import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Card,
  CircularProgress,
  Chip,
  Avatar,
  Grid,
  IconButton,
  Badge,
} from '@mui/material';
import {
  CreditScore,
  DirectionsBus,
  DirectionsBike,
  DriveEta,
  AttachFile,
  CheckCircle,
  PendingActions,
  Home,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AddNewTrip, GetAllTrips } from '../../redux/slice/trip';

const EmployeeDashboard = () => {

  const { user: loggedUser } = useSelector((state) => state.auth);
  const { trips: userTrips } = useSelector((state) => state.trip);

  console.log({ userTrips });

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState('home');

  const [tripData, setTripData] = useState({
    distance: '',
    transportMode: 'bus',
    date: new Date().toISOString().split('T')[0],
    proof: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateCredits = (mode, distance) => {
    const multipliers = { bus: 1.2, bike: 1.5, car: 0.2 };
    return Math.round(distance * multipliers[mode]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (!tripData.proof) {
      setIsSubmitting(false);
      setTripData({
        ...tripData,
        fileError: 'Please upload proof (image file) to submit the trip.',
      });
      return;
    }
  
    const newCredits = calculateCredits(tripData.transportMode, tripData.distance);
  
    try {
      dispatch(AddNewTrip({
        userId: loggedUser?.userId,
        date: tripData.date,
        mode: tripData.transportMode,
        distance: tripData.distance,
        credits: newCredits,
        proof: tripData.proof?.name || null
      }));
      setTripData({
        distance: '',
        transportMode: 'bus',
        date: new Date().toISOString().split('T')[0],
        proof: null,
      });
    } catch (err) {
      console.error("Trip submission error:", err);
    }
  
    setIsSubmitting(false);
  };  

  const transportModes = [
    { value: 'bus', label: 'Bus/Train', icon: <DirectionsBus /> },
    { value: 'bike', label: 'Bike/Walk', icon: <DirectionsBike /> },
    { value: 'car', label: 'Car (Solo)', icon: <DriveEta /> },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        setTripData({ ...tripData, proof: file, fileError: '' });
      } else {
        setTripData({ ...tripData, fileError: 'Please upload an image (PNG or JPG)' });
      }
    }
  };

  console.log({ loggedUser });
  useEffect(() => {
    dispatch(GetAllTrips({
      userId: loggedUser?.userId
    }));
  }, [tripData]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f9fafb' }}>
      <Box
        sx={{
          width: 72,
          bgcolor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#2A9D8F', mb: 4, cursor: 'pointer' }}
          onClick={() => navigate('/app')}
        >
          CT
        </Typography>
        <IconButton
          onClick={() => setActiveTab('home')}
          sx={{
            mb: 2,
            color: activeTab === 'home' ? '#2A9D8F' : '#6b7280',
            '&:hover': { color: '#21867A' },
          }}
        >
          <Home />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, p: 4, maxWidth: '1400px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827', fontFamily: "'Inter', sans-serif" }}>
            {activeTab === 'home' && 'Dashboard'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Badge
              badgeContent={loggedUser.userRole.charAt(0).toUpperCase()}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: '#2A9D8F',
                  color: '#fff',
                  fontSize: '0.7rem',
                  minWidth: '16px',
                  height: '16px',
                },
              }}
            >
              <Avatar sx={{ bgcolor: '#2A9D8F', width: 36, height: 36 }}>
                {loggedUser.name.charAt(0)}
              </Avatar>
            </Badge>
            <Typography variant="body2" sx={{ color: '#6b7280', fontFamily: "'Inter', sans-serif" }}>
              {loggedUser.userRole}
            </Typography>
          </Box>
        </Box>

        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    p: 4,
                    width: '100%',
                    borderRadius: 3,
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 6px 12px -2px rgba(0,0,0,0.1)',
                    minHeight: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#fff',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                <Box sx={{
                  mb: 4,
                  p: 3,
                  bgcolor: '#f0fdf4',
                  borderRadius: 2,
                  borderLeft: '4px solid #2A9D8F',
                  position: 'relative'
                }}>
                  <Typography variant="body1" sx={{
                    fontStyle: 'italic',
                    color: '#1f2937',
                    mb: 1,
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6
                  }}>
                    "Every mile you don't drive alone is a gift to our planet. Your sustainable commutes today grow the forests of tomorrow."
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: '#2A9D8F',
                    fontWeight: 500,
                    display: 'block',
                    textAlign: 'right',
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    — CarbonTrack Philosophy
                  </Typography>
                </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: '#111827', mb: 4, fontFamily: "'Inter', sans-serif" }}
                  >
                    Log New Trip
                  </Typography>
                  <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ flex: 1 }}>
                      <TextField
                        fullWidth
                        label="Distance (km)"
                        type="number"
                        value={tripData.distance}
                        onChange={(e) => setTripData({ ...tripData, distance: e.target.value })}
                        required
                        variant="outlined"
                        sx={{
                          mb: 3,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            bgcolor: '#f9fafb',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            '&:hover fieldset': { borderColor: '#2A9D8F' },
                            fontFamily: "'Inter', sans-serif",
                            py: '4px',
                          },
                          '& .MuiInputLabel-root': {
                            color: '#6b7280',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                          },
                        }}
                      />
                      <Select
                        fullWidth
                        value={tripData.transportMode}
                        onChange={(e) => setTripData({ ...tripData, transportMode: e.target.value })}
                        sx={{
                          mb: 3,
                          borderRadius: '12px',
                          bgcolor: '#f9fafb',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                          '& .MuiSelect-select': {
                            display: 'flex',
                            alignItems: 'center',
                            py: '12px',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#2A9D8F' },
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {transportModes.map((mode) => (
                          <MenuItem key={mode.value} value={mode.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {mode.icon}
                              <Typography sx={{ fontFamily: "'Inter', sans-serif" }}>
                                {mode.label}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      <TextField
                        fullWidth
                        type="date"
                        value={tripData.date}
                        onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
                        required
                        variant="outlined"
                        sx={{
                          mb: 3,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            bgcolor: '#f9fafb',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            '&:hover fieldset': { borderColor: '#2A9D8F' },
                            fontFamily: "'Inter', sans-serif",
                            padding: '8px 12px',
                          },
                          '& .MuiInputLabel-root': {
                            display: 'none',
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '12px',
                            color: '#111827',
                            fontFamily: "'Inter', sans-serif",
                          },
                        }}
                      />
                      <Button
                        component="label"
                        variant="outlined"
                        fullWidth
                        startIcon={<AttachFile />}
                        sx={{
                          mb: 3,
                          textTransform: 'none',
                          color: '#2A9D8F',
                          borderColor: '#2A9D8F',
                          borderRadius: '12px',
                          py: '12px',
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                          '&:hover': {
                            borderColor: '#21867A',
                            color: '#21867A',
                            bgcolor: '#f1f5f9',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        Upload Proof (Image only)
                        <input type="file" hidden onChange={handleFileUpload} accept="image/png, image/jpg, image/jpeg" />
                      </Button>
                      {tripData.proof && (
                        <Chip
                          label={tripData.proof.name}
                          onDelete={() => setTripData({ ...tripData, proof: null })}
                          sx={{
                            mt: 1,
                            mb: 3,
                            bgcolor: '#e5e7eb',
                            color: '#111827',
                            fontFamily: "'Inter', sans-serif",
                            borderRadius: '12px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                          }}
                        />
                      )}
                    </Box>
                    {tripData.fileError && (
                      <Typography variant="caption" sx={{ color: 'red' }}>
                        {tripData.fileError}
                      </Typography>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{
                        bgcolor: '#2A9D8F',
                        color: '#fff',
                        borderRadius: '12px',
                        py: '14px',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        '&:hover': {
                          bgcolor: '#21867A',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                        },
                        '&:disabled': {
                          bgcolor: '#e0e0e0',
                          color: '#9ca3af',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      {isSubmitting ? <CircularProgress size={24} /> : 'Submit Trip'}
                    </Button>
                  </form>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    mt: 3,
                    bgcolor: '#fff',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#111827', mb: 3, fontFamily: "'Inter', sans-serif" }}
                  >
                    Recent Trips
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      overflowX: 'auto',
                      gap: 3,
                      pb: 2,
                      '&::-webkit-scrollbar': {
                        height: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#2A9D8F',
                        borderRadius: '3px',
                      },
                    }}
                  >
                    {userTrips.map((trip) => (
                      <Card
                        key={trip._id}
                        sx={{
                          minWidth: 280,
                          p: 3,
                          borderRadius: 2,
                          border: '1px solid #e5e7eb',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          bgcolor: '#fff',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box
                            sx={{
                              bgcolor: '#2A9D8F20',
                              p: 1.5,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {transportModes.find((m) => m.value === trip.tripMode).icon}
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                color: '#111827',
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {new Date(trip.tripDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#6b7280',
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {trip.tripDistance} km • {trip.tripCredits} pts
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            icon={trip.tripStatus === 'verified' ? <CheckCircle /> : <PendingActions />}
                            label={trip.tripStatus === 'verified' ? 'Verified' : 'Pending'}
                            color={trip.tripStatus === 'verified' ? 'success' : 'warning'}
                            size="small"
                            sx={{
                              fontWeight: 500,
                              fontFamily: "'Inter', sans-serif",
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#2A9D8F',
                              fontWeight: 600,
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            +{trip.tripCredits} pts
                          </Typography>
                        </Box>
                      </Card>
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default EmployeeDashboard;