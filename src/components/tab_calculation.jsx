import { useMemo, useState } from 'react';

const vehicleConfigs = {
  '35MT': {
    fields: {
      basic: 39211,
      discount: 3000,
      loading: 5880,
      gst: 18,
      token: 500,
    },
    fieldsSell: {
      basic: 39211,
      discount: 2500,
      loading: 5880,
      gst: 18,
      token: 1000,
    },
  },

  '15MT': {
    fields: {
      basic: 39211,
      discount: 3000,
      loading: 5880,
      gst: 18,
      paper: 500,
      bhada: 2500,
      shortage: 300,
      margin: 0,
    },
    fieldsSell: {
      basic: 39211,
      discount: 2500,
      loading: 5880,
      gst: 18,
      paper: 1000,
      bhada: 2500,
      shortage: 300,
      margin: 300,
    },
  },

  '6MT': {
    fields: {
      basic: 40711,
      discount: 3000,
      loading: 5880,
      gst: 18,
      paper: 500,
      bhada: 2600,
      unloading: 200,
      shortage: 300,
      hammali: 200,
      extraBhada: 700,
      margin: 0,
    },
    fieldsSell: {
      basic: 40711,
      discount: 2500,
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
  const currentFieldsSell = formData[activeTab].fieldsSell;

  const calculations = useMemo(() => {
    const taxableAmount =
      currentFields.basic - currentFields.discount + currentFields.loading;

    const gstAmount = taxableAmount * (currentFields.gst / 100);

    let totalWithGST;
    let netRate;
    let landingCost;
    let finalRate06MT;
    // = taxableAmount + gstAmount + currentFields.token;

    if (activeTab === '35MT') {
      totalWithGST = taxableAmount + gstAmount + currentFields.token;
    } else if (activeTab === '15MT') {
      totalWithGST = taxableAmount + gstAmount + currentFields?.paper;
      netRate =
        totalWithGST +
        currentFields?.bhada +
        currentFields?.shortage +
        currentFields?.margin;
    } else {
      totalWithGST = taxableAmount + gstAmount + currentFieldsSell?.paper;
      landingCost =
        totalWithGST +
        currentFields?.bhada +
        currentFields?.unloading +
        currentFields?.shortage;
      finalRate06MT =
        landingCost +
        currentFields?.hammali +
        currentFields?.extraBhada +
        currentFields?.margin;
    }

    let finalRate = totalWithGST;

    let totalPurchase = totalWithGST;

    Object.entries(currentFields).forEach(([key, value]) => {
      if (!['basic', 'discount', 'loading', 'gst'].includes(key)) {
        finalRate += Number(value);
      }
    });

    const perKgRate = netRate / 1000;

    return {
      taxableAmount,
      gstAmount,
      totalWithGST,
      finalRate,
      perKgRate,
      totalPurchase,
      netRate,
      landingCost,
      finalRate06MT,
    };
  }, [activeTab, currentFields, currentFieldsSell?.paper]);

  const calculationsSell = useMemo(() => {
    const taxableAmount =
      currentFieldsSell.basic -
      currentFieldsSell.discount +
      currentFieldsSell.loading;

    const gstAmount = taxableAmount * (currentFieldsSell.gst / 100);
    let totalWithGST;
    let netRate;
    let landingCost;
    let finalRate06MT;
    if (activeTab === '35MT') {
      totalWithGST = taxableAmount + gstAmount + currentFieldsSell.token;
    } else if (activeTab === '15MT') {
      totalWithGST = taxableAmount + gstAmount + currentFieldsSell?.paper;
      netRate =
        totalWithGST +
        currentFieldsSell?.bhada +
        currentFieldsSell?.shortage +
        currentFieldsSell?.margin;
    } else {
      totalWithGST = taxableAmount + gstAmount + currentFieldsSell?.paper;
      landingCost =
        totalWithGST +
        currentFieldsSell?.bhada +
        currentFieldsSell?.unloading +
        currentFieldsSell?.shortage;
      finalRate06MT =
        landingCost +
        currentFieldsSell?.hammali +
        currentFieldsSell?.extraBhada +
        currentFieldsSell?.margin;
    }

    let finalRate = totalWithGST;

    let totalSell = totalWithGST;

    Object.entries(currentFieldsSell).forEach(([key, value]) => {
      if (!['basic', 'discount', 'loading', 'gst'].includes(key)) {
        finalRate += Number(value);
      }
    });

    const perKgRate = netRate / 1000;

    return {
      taxableAmount,
      gstAmount,
      totalWithGST,
      finalRate,
      perKgRate,
      totalSell,
      netRate,
      landingCost,
      finalRate06MT,
    };
  }, [activeTab, currentFieldsSell]);

  // 15 MT

  // 15 MT

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        fields: {
          ...prev[activeTab].fields,
          [field]: parseFloat(value),
        },
      },
    }));
  };
  const updateFieldSell = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        fieldsSell: {
          ...prev[activeTab].fieldsSell,
          [field]: parseFloat(value),
        },
      },
    }));
  };

  return (
    <div className="container">
      <h2>Gadi Rate Calculator</h2>

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
      {/* PURCHASE */}

      <div>
        <hr className="" />

        <h2>Purchase</h2>
        <h2>
          {activeTab === '35MT' &&
            `Total Purchase ₹ ${calculations.totalPurchase.toFixed(2)}`}
        </h2>
        <h2>
          {activeTab === '6MT' &&
            `Final Rate ₹ ${calculations.finalRate06MT.toFixed(2)}`}
        </h2>

        <h3>
          {activeTab === '15MT' &&
            ` | Net rate ₹ ${calculations.netRate.toFixed(2)}`}
        </h3>

        <h3>
          {activeTab === '15MT' &&
            ` | Per KG Rate ₹ ${calculations.perKgRate.toFixed(2)}`}
        </h3>

        <h3>
          {activeTab === '6MT' &&
            ` | Landing Cost ₹ ${calculations.landingCost.toFixed(2)}`}
        </h3>
        <h3>
          {activeTab === '6MT' &&
            `| Final Rate/kg ₹ ${(calculations.finalRate06MT / 1000).toFixed(2)}`}
        </h3>

        <div className="form-container">
          {Object.entries(currentFields).map(([field, value]) => (
            <div key={field} className="form-inputs">
              <label className="labels">{formatLabel(field)}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => updateField(field, e.target.value)}
                className="input"
              />
            </div>
          ))}
        </div>
      </div>
      {/* PURCHASE */}

      {/* Sell */}
      <div>
        <hr />

        <h2>Sell</h2>

        <h2>
          {activeTab === '35MT' &&
            `Total Sell ₹ ${calculationsSell.totalSell.toFixed(2)}`}
        </h2>
        <h3>
          {activeTab === '15MT' &&
            ` | Net rate ₹ ${calculationsSell.netRate.toFixed(2)}`}
        </h3>

        <h3>
          {activeTab === '15MT' &&
            ` | Per KG Rate ₹ ${calculationsSell.perKgRate.toFixed(2)}`}
        </h3>
        <h2>
          {activeTab === '6MT' &&
            ` | Landing Cost ₹ ${calculationsSell.landingCost.toFixed(2)}`}
        </h2>

        <h3>
          {activeTab === '6MT' &&
            ` | Final Rate ₹ ${calculationsSell.finalRate06MT.toFixed(2)}`}
        </h3>

        <h3>
          {activeTab === '6MT' &&
            `| Final Rate/kg ₹ ${(calculationsSell.finalRate06MT / 1000).toFixed(2)}`}
        </h3>
        <div className="form-container">
          {Object.entries(currentFieldsSell).map(([fieldsSell, value]) => (
            <div key={fieldsSell} className="form-inputs">
              <label className="labels">{formatLabel(fieldsSell)}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => updateFieldSell(fieldsSell, e.target.value)}
                className="input"
                // style={styles.input}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Sell */}
      <h2>
        {activeTab === '35MT' &&
          `Profit ₹ ${(calculationsSell.totalSell - calculations.totalPurchase).toFixed(2)}`}
      </h2>
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
};
