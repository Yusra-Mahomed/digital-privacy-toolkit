import React, { useState } from 'react';
import axios from 'axios';

// MUI table imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function UrlAnalyzer() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleAnalyze = async () => {
    if (!url.startsWith('http')) {
      setResult({ error: 'Please enter a valid URL starting with http or https.' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/tracking/analyze-url',
        { url }
      );
      setResult(response.data.result);
    } catch (error) {
      setResult({ error: error?.response?.data?.detail || 'Failed to analyse URL.' });
    }

    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-10 w-full max-w-5xl text-left">
      <h2 className="text-xl font-semibold text-blue-900 mb-2">Analyse Website Scripts & Cookies</h2>
      <p className="text-gray-700 mb-4">
        Enter a website URL to detect how many scripts and third-party domains it loads. We’ll also try to estimate cookie usage and show detailed cookie attributes.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-grow border px-4 py-2 rounded"
        />
        <button
          onClick={handleAnalyze}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Analyse
        </button>
      </div>

      {loading && <p className="text-gray-600">Analysing...</p>}

      {result && (
        <div className="mt-4 text-sm text-gray-800 space-y-4">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <p><strong>Risk Level:</strong> {result.risk_level}</p>
              <p><strong>Total Scripts:</strong> {result.total_scripts}</p>
              <p><strong>Third-party Domains:</strong> {result.third_party_domains.length > 0 ? result.third_party_domains.join(', ') : 'None'}</p>

              <div>
                <p><strong>Warnings:</strong></p>
                <ul className="list-disc pl-6">
                  {result.warnings.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>

              {/* MUI Table for cookies */}
              {result.cookie_details && result.cookie_details.length > 0 ? (
                <div>
                  <p className="mt-4"><strong>Cookies Detected:</strong> {result.cookie_details.length}</p>

                  <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="cookie table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Domain</TableCell>
                            <TableCell>Path</TableCell>
                            <TableCell>Expires</TableCell>
                            <TableCell>Secure</TableCell>
                            <TableCell>HttpOnly</TableCell>
                            <TableCell>SameSite</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {result.cookie_details
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((cookie, idx) => (
                              <TableRow hover key={idx}>
                                <TableCell>{cookie.name}</TableCell>
                                <TableCell style={{ maxWidth: 200, wordBreak: 'break-word' }}>{cookie.value}</TableCell>
                                <TableCell>{cookie.domain || '—'}</TableCell>
                                <TableCell>{cookie.path || '—'}</TableCell>
                                <TableCell>{cookie.expires || '—'}</TableCell>
                                <TableCell>{cookie.secure ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{cookie.httponly ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{cookie.samesite || '—'}</TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={result.cookie_details.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              ) : (
                <p>No cookies detected.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
