
import Link from "next/link";
import { GitBranch, BookOpen, Activity, Plus, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Box, Typography, Button, Grid, Card, CardContent, CardActions, Chip, Avatar, Paper, Divider, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function DashboardPage() {
  return (
    <Box sx={{ minHeight: '100vh', p: 4, maxWidth: '1200px', mx: 'auto', bgcolor: 'background.default' }}>
      <Box component="header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
        <Box>
          <Typography variant="h3" fontWeight={700} color="text.primary" gutterBottom>Dashboard</Typography>
          <Typography color="text.secondary">Overview of your documentation health and activity.</Typography>
        </Box>
        <Button
          component={Link}
          href="/repo-link"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 999, boxShadow: 2, fontWeight: 500, px: 3, py: 1.5 }}
        >
          New Project
        </Button>
      </Box>

      <Grid container spacing={3} mb={6}>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 4, border: 1, borderColor: 'divider', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}>
                  <BookOpen className="h-6 w-6" />
                </Avatar>
                <Chip label="+2.4%" color="success" size="small" />
              </Stack>
              <Typography variant="h4" fontWeight={700} color="text.primary">84%</Typography>
              <Typography color="text.secondary">Documentation Coverage</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 4, border: 1, borderColor: 'divider', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main', width: 48, height: 48 }}>
                  <GitBranch className="h-6 w-6" />
                </Avatar>
              </Stack>
              <Typography variant="h4" fontWeight={700} color="text.primary">3</Typography>
              <Typography color="text.secondary">Active PRs Monitored</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 4, border: 1, borderColor: 'divider', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 6 } }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.main', width: 48, height: 48 }}>
                  <Activity className="h-6 w-6" />
                </Avatar>
                <Chip label="Action Needed" color="warning" size="small" />
              </Stack>
              <Typography variant="h4" fontWeight={700} color="text.primary">2 Files</Typography>
              <Typography color="text.secondary">Drift Detected</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight={600} mb={2} color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Activity className="h-5 w-5" /> Active Repositories
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 4, border: 1, borderColor: 'divider', overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.2s', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'grey.100', color: 'grey.700', width: 40, height: 40 }}>
              <GitBranch className="h-5 w-5" />
            </Avatar>
            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography fontWeight={600} color="text.primary">livingdocs-ai/backend</Typography>
                <Chip label="Synced" color="success" size="small" sx={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }} />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle2 className="h-3 w-3" /> Updated 2 mins ago
              </Typography>
            </Box>
          </Stack>
          <Button component={Link} href="/doc-diff" endIcon={<ArrowForwardIcon />} size="small" color="primary" sx={{ fontWeight: 500 }}>
            View Details
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}