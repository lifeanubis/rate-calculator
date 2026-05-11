import { useMemo, useState } from 'react';

const vehicleConfigs = {
  '35MT': {
    fields: {
      basic: 37811,
      discount: 3000,
      loading: 5880,
      gst: 18,
      tokan: 500,
    },
  },

  '15MT': {
    fields: {
      basic: 37811,
      discount: 3000,
      loading: 5880,
      gst: 18,
      paper: 500,
      bhada: 2500,
      shortage: 300,
      margin: 300,
    },
  },

  '6MT': {
    fields: {
      basic: 37811,
      discount: 3000,
      loading: 5880,
      gst: 18,
      paper: 500,
      bhada: 2600,
      unloading: 200,
      shortage: 300,
      hammali: 200,
      extraBhada: 700,
      margin: 500,
    },
  },
};

export default function GadiRateCalculator() {
  const [activeTab, setActiveTab] = useState('35MT');

  const [formData, setFormData] = useState(vehicleConfigs);

  const currentFields = formData[activeTab].fields;

  const calculations = useMemo(() => {
    const taxableAmount =
      currentFields.basic - currentFields.discount + currentFields.loading;

    const gstAmount = taxableAmount * (currentFields.gst / 100);

    const totalWithGST = taxableAmount + gstAmount;

    let finalRate = totalWithGST;

    Object.entries(currentFields).forEach(([key, value]) => {
      if (!['basic', 'discount', 'loading', 'gst'].includes(key)) {
        finalRate += Number(value);
      }
    });

    const perKgRate = finalRate / 1000;

    return {
      taxableAmount,
      gstAmount,
      totalWithGST,
      finalRate,
      perKgRate,
    };
  }, [currentFields]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        fields: {
          ...prev[activeTab].fields,
          [field]: Number(value),
        },
      },
    }));
  };

  return (
    <div style={styles.container}>
      <h1>Gadi Rate Calculator</h1>

      {/* Tabs */}
      <div style={styles.tabs}>
        {Object.keys(vehicleConfigs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tabButton,
              background: activeTab === tab ? '#111' : '#ddd',
              color: activeTab === tab ? '#fff' : '#000',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div style={styles.form}>
        {Object.entries(currentFields).map(([field, value]) => (
          <div key={field} style={styles.inputGroup}>
            <label style={styles.label}>{formatLabel(field)}</label>

            <input
              type="number"
              value={value}
              onChange={(e) => updateField(field, e.target.value)}
              style={styles.input}
            />
          </div>
        ))}
      </div>

      {/* Results */}
      <div style={styles.results}>
        <h2>Results</h2>

        <ResultRow label="Taxable Amount" value={calculations.taxableAmount} />

        <ResultRow label="GST Amount" value={calculations.gstAmount} />

        <ResultRow label="Total With GST" value={calculations.totalWithGST} />

        <ResultRow label="Final Rate" value={calculations.finalRate} />

        <ResultRow label="Per KG Rate" value={calculations.perKgRate} />
      </div>
    </div>
  );
}

function ResultRow({ label, value }) {
  return (
    <div style={styles.resultRow}>
      <span>{label}</span>
      <strong>₹ {value.toFixed(2)}</strong>
    </div>
  );
}

function formatLabel(label) {
  return label
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial',
    border: '1px solid #ddd',
    borderRadius: '10px',
  },

  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },

  tabButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },

  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    marginBottom: '5px',
    fontWeight: '600',
  },

  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },

  results: {
    marginTop: '30px',
    padding: '20px',
    background: '#f7f7f7',
    borderRadius: '10px',
  },

  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '16px',
  },
};
