import React, { useState, useMemo } from 'react';

export default function RateCalculator() {
  const [basic, setBasic] = useState(37811);
  const [discount, setDiscount] = useState(3000);
  const [loading, setLoading] = useState(5880);
  const [gst, setGst] = useState(18);

  const [paper, setPaper] = useState(500);
  const [bhada, setBhada] = useState(2500);
  const [shotage, setShotage] = useState(300);
  const [margin, setMargin] = useState(300);

  const calculations = useMemo(() => {
    // Step 1
    const taxableAmount = basic - discount + loading;

    // Step 2
    const gstAmount = taxableAmount * (gst / 100);

    // Step 3
    const totalWithGST = taxableAmount + gstAmount;

    // Step 4
    const finalRate = totalWithGST + paper + bhada + shotage + margin;

    // Step 5
    const perKgRate = finalRate / 1000;

    return {
      taxableAmount,
      gstAmount,
      totalWithGST,
      finalRate,
      perKgRate,
    };
  }, [basic, discount, loading, gst, paper, bhada, shotage, margin]);

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>Gadi Rate Calculator</h2>

      <Input label="Basic Rate" value={basic} setValue={setBasic} />
      <Input label="Discount" value={discount} setValue={setDiscount} />
      <Input label="Loading" value={loading} setValue={setLoading} />
      <Input label="GST %" value={gst} setValue={setGst} />

      <Input label="Paper" value={paper} setValue={setPaper} />
      <Input label="Bhada" value={bhada} setValue={setBhada} />
      <Input label="Shotage" value={shotage} setValue={setShotage} />
      <Input label="Margin" value={margin} setValue={setMargin} />

      <hr />

      <h3>Results</h3>

      <p>Taxable Amount: ₹{calculations.taxableAmount.toFixed(2)}</p>

      <p>GST Amount: ₹{calculations.gstAmount.toFixed(2)}</p>

      <p>Total With GST: ₹{calculations.totalWithGST.toFixed(2)}</p>

      <p>Final Rate: ₹{calculations.finalRate.toFixed(2)}</p>

      <p>Per KG Rate: ₹{calculations.perKgRate.toFixed(2)}</p>
    </div>
  );
}

function Input({ label, value, setValue }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label>{label}</label>
      <br />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{
          width: '100%',
          padding: 8,
          marginTop: 4,
        }}
      />
    </div>
  );
}
