import React, { useState, useEffect } from 'react';
import { Calculator, Target, Info, AlertCircle, Copy, Check } from 'lucide-react';

const RorstodCalculator = () => {
  const [inputs, setInputs] = useState({
    ytterrorInnerDiameter: '',
    ytterrorYtterDiameter: '',
    sdr: '',
    innerrorYtterDiameter: '',
    ccMatt: '2',
    langd: '',
    antalRingar: ''
  });

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [copiedResult, setCopiedResult] = useState(null);

  // Data från blad 2 - rörstöd kategorier och dimensioner
  const rorstodData = [
    { kategori: 'Maxi', minYd: 325, maxYd: 395, antalSegment: 3, optimal: false },
    { kategori: 'Maxi', minYd: 426, maxYd: 546, antalSegment: 4, optimal: false },
    { kategori: 'Maxi', minYd: 532, maxYd: 652, antalSegment: 5, optimal: false },
    { kategori: 'Maxi', minYd: 638, maxYd: 819, antalSegment: 6, optimal: true },
    { kategori: 'Maxi', minYd: 745, maxYd: 955, antalSegment: 7, optimal: true },
    { kategori: 'Maxi', minYd: 851, maxYd: 1092, antalSegment: 8, optimal: true },
    { kategori: 'Maxi', minYd: 957, maxYd: 1179, antalSegment: 9, optimal: false },
    { kategori: 'Maxi', minYd: 1064, maxYd: 1365, antalSegment: 10, optimal: true },
    { kategori: 'Maxi', minYd: 1170, maxYd: 1502, antalSegment: 11, optimal: false },
    { kategori: 'Maxi', minYd: 1276, maxYd: 1838, antalSegment: 12, optimal: true },
    { kategori: 'Maxi', minYd: 1383, maxYd: 1775, antalSegment: 13, optimal: false },
    { kategori: 'Maxi', minYd: 1489, maxYd: 1911, antalSegment: 14, optimal: true },
    { kategori: 'Maxi', minYd: 1595, maxYd: 2048, antalSegment: 15, optimal: false },
    { kategori: 'Medi', minYd: 390, maxYd: 495, antalSegment: 4, optimal: true },
    { kategori: 'Medi', minYd: 495, maxYd: 625, antalSegment: 5, optimal: true },
    { kategori: 'Medi', minYd: 600, maxYd: 750, antalSegment: 6, optimal: true },
    { kategori: 'Medi', minYd: 700, maxYd: 890, antalSegment: 7, optimal: false },
    { kategori: 'Medi', minYd: 800, maxYd: 1000, antalSegment: 8, optimal: false },
    { kategori: 'Micro', minYd: 21, maxYd: 29, antalSegment: 3, optimal: true },
    { kategori: 'Micro', minYd: 29, maxYd: 40, antalSegment: 4, optimal: true },
    { kategori: 'Micro', minYd: 38, maxYd: 49, antalSegment: 5, optimal: true },
    { kategori: 'Micro', minYd: 45, maxYd: 60, antalSegment: 6, optimal: true },
    { kategori: 'Micro', minYd: 55, maxYd: 69, antalSegment: 7, optimal: false },
    { kategori: 'Micro', minYd: 61, maxYd: 80, antalSegment: 8, optimal: false },
    { kategori: 'Midi', minYd: 104, maxYd: 141, antalSegment: 3, optimal: false },
    { kategori: 'Midi', minYd: 138, maxYd: 188, antalSegment: 4, optimal: true },
    { kategori: 'Midi', minYd: 175, maxYd: 235, antalSegment: 5, optimal: true },
    { kategori: 'Midi', minYd: 207, maxYd: 282, antalSegment: 6, optimal: true },
    { kategori: 'Midi', minYd: 241, maxYd: 329, antalSegment: 7, optimal: true },
    { kategori: 'Midi', minYd: 276, maxYd: 376, antalSegment: 8, optimal: true },
    { kategori: 'Midi', minYd: 310, maxYd: 423, antalSegment: 9, optimal: false },
    { kategori: 'Midi', minYd: 344, maxYd: 470, antalSegment: 10, optimal: false },
    { kategori: 'Midi', minYd: 379, maxYd: 517, antalSegment: 11, optimal: false },
    { kategori: 'Midi', minYd: 413, maxYd: 564, antalSegment: 12, optimal: false },
    { kategori: 'Mini', minYd: 46, maxYd: 62, antalSegment: 3, optimal: true },
    { kategori: 'Mini', minYd: 62, maxYd: 83, antalSegment: 4, optimal: true },
    { kategori: 'Mini', minYd: 77, maxYd: 104, antalSegment: 5, optimal: true },
    { kategori: 'Mini', minYd: 92, maxYd: 125, antalSegment: 6, optimal: true },
    { kategori: 'Mini', minYd: 107, maxYd: 145, antalSegment: 7, optimal: true },
    { kategori: 'Mini', minYd: 123, maxYd: 166, antalSegment: 8, optimal: false },
    { kategori: 'Mini', minYd: 138, maxYd: 187, antalSegment: 9, optimal: false },
    { kategori: 'Mini', minYd: 153, maxYd: 205, antalSegment: 10, optimal: false },
    { kategori: 'Mini', minYd: 169, maxYd: 228, antalSegment: 11, optimal: false },
    { kategori: 'Mini', minYd: 184, maxYd: 249, antalSegment: 12, optimal: false }
  ];

  // Data från blad 1 - produkter med höjder
  const produktData = [
    { kategori: 'Maxi', artNr: '14MFMAXI021', rskNr: '381 21 61', bredd: 225, hojd: 21.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI028', rskNr: '381 21 62', bredd: 225, hojd: 28.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI038', rskNr: '381 21 63', bredd: 225, hojd: 38.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI050', rskNr: '381 21 64', bredd: 225, hojd: 50.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI065', rskNr: '381 21 65', bredd: 225, hojd: 65.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI075', rskNr: '381 21 66', bredd: 225, hojd: 75.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI090', rskNr: '381 21 67', bredd: 225, hojd: 90.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI100', rskNr: '381 21 68', bredd: 225, hojd: 100.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI125', rskNr: '381 21 69', bredd: 225, hojd: 125.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI135', rskNr: '381 21 70', bredd: 225, hojd: 135.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI150', rskNr: '381 21 71', bredd: 225, hojd: 150.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI165', rskNr: '381 21 72', bredd: 225, hojd: 165.0 },
    { kategori: 'Maxi', artNr: '14MFMAXI175', rskNr: '381 21 73', bredd: 225, hojd: 175.0 },
    { kategori: 'Medi', artNr: '14MFMEDI021', rskNr: '381 21 48', bredd: 175, hojd: 21.0 },
    { kategori: 'Medi', artNr: '14MFMEDI028', rskNr: '381 21 49', bredd: 175, hojd: 28.0 },
    { kategori: 'Medi', artNr: '14MFMEDI038', rskNr: '381 21 50', bredd: 175, hojd: 38.0 },
    { kategori: 'Medi', artNr: '14MFMEDI050', rskNr: '381 21 51', bredd: 175, hojd: 50.0 },
    { kategori: 'Medi', artNr: '14MFMEDI065', rskNr: '381 21 52', bredd: 175, hojd: 65.0 },
    { kategori: 'Medi', artNr: '14MFMEDI075', rskNr: '381 21 53', bredd: 175, hojd: 75.0 },
    { kategori: 'Medi', artNr: '14MFMEDI090', rskNr: '381 21 54', bredd: 175, hojd: 90.0 },
    { kategori: 'Medi', artNr: '14MFMEDI100', rskNr: '381 21 55', bredd: 175, hojd: 100.0 },
    { kategori: 'Medi', artNr: '14MFMEDI125', rskNr: '381 21 56', bredd: 175, hojd: 125.0 },
    { kategori: 'Medi', artNr: '14MFMEDI135', rskNr: '381 21 57', bredd: 175, hojd: 135.0 },
    { kategori: 'Medi', artNr: '14MFMEDI150', rskNr: '381 21 58', bredd: 175, hojd: 150.0 },
    { kategori: 'Medi', artNr: '14MFMEDI165', rskNr: '381 21 59', bredd: 175, hojd: 165.0 },
    { kategori: 'Medi', artNr: '14MFMEDI175', rskNr: '381 21 60', bredd: 175, hojd: 175.0 },
    { kategori: 'Micro', artNr: '14MFMICRO008', rskNr: '381 21 20', bredd: 54, hojd: 8.0 },
    { kategori: 'Micro', artNr: '14MFMICRO012,5', rskNr: '381 21 21', bredd: 54, hojd: 12.5 },
    { kategori: 'Micro', artNr: '14MFMICRO016,5', rskNr: '381 21 22', bredd: 54, hojd: 16.5 },
    { kategori: 'Micro', artNr: '14MFMICRO021', rskNr: '381 21 23', bredd: 54, hojd: 21.0 },
    { kategori: 'Micro', artNr: '14MFMICRO028', rskNr: '381 21 24', bredd: 54, hojd: 28.0 },
    { kategori: 'Micro', artNr: '14MFMICRO038', rskNr: '381 21 25', bredd: 54, hojd: 38.0 },
    { kategori: 'Micro', artNr: '14MFMICRO050', rskNr: '381 21 26', bredd: 54, hojd: 50.0 },
    { kategori: 'Micro', artNr: '14MFMICRO065', rskNr: '381 21 27', bredd: 54, hojd: 65.0 },
    { kategori: 'Micro', artNr: '14MFMICRO075', rskNr: '381 21 28', bredd: 54, hojd: 75.0 },
    { kategori: 'Micro', artNr: '14MFMICRO090', rskNr: '381 21 29', bredd: 54, hojd: 90.0 },
    { kategori: 'Micro', artNr: '14MFMICRO100', rskNr: '381 21 30', bredd: 54, hojd: 100.0 },
    { kategori: 'Midi', artNr: '14MFMIDI012,5', rskNr: '381 21 38', bredd: 130, hojd: 12.5 },
    { kategori: 'Midi', artNr: '14MFMIDI016,5', rskNr: '381 16 56', bredd: 130, hojd: 16.5 },
    { kategori: 'Midi', artNr: '14MFMIDI021', rskNr: '381 16 58', bredd: 130, hojd: 21.0 },
    { kategori: 'Midi', artNr: '14MFMIDI028', rskNr: '381 16 59', bredd: 130, hojd: 28.0 },
    { kategori: 'Midi', artNr: '14MFMIDI038', rskNr: '381 16 57', bredd: 130, hojd: 38.0 },
    { kategori: 'Midi', artNr: '14MFMIDI050', rskNr: '381 16 60', bredd: 130, hojd: 50.0 },
    { kategori: 'Midi', artNr: '14MFMIDI065', rskNr: '381 21 39', bredd: 130, hojd: 65.0 },
    { kategori: 'Midi', artNr: '14MFMIDI075', rskNr: '381 21 40', bredd: 130, hojd: 75.0 },
    { kategori: 'Midi', artNr: '14MFMIDI090', rskNr: '381 21 41', bredd: 130, hojd: 90.0 },
    { kategori: 'Midi', artNr: '14MFMIDI100', rskNr: '381 21 42', bredd: 130, hojd: 100.0 },
    { kategori: 'Midi', artNr: '14MFMIDI125', rskNr: '381 21 43', bredd: 130, hojd: 125.0 },
    { kategori: 'Midi', artNr: '14MFMIDI135', rskNr: '381 21 44', bredd: 130, hojd: 135.0 },
    { kategori: 'Midi', artNr: '14MFMIDI150', rskNr: '381 21 45', bredd: 130, hojd: 150.0 },
    { kategori: 'Midi', artNr: '14MFMIDI165', rskNr: '381 21 46', bredd: 130, hojd: 165.0 },
    { kategori: 'Midi', artNr: '14MFMIDI175', rskNr: '381 21 47', bredd: 130, hojd: 175.0 },
    { kategori: 'Mini', artNr: '14MFMINI009', rskNr: '381 21 31', bredd: 80, hojd: 9.0 },
    { kategori: 'Mini', artNr: '14MFMINI012,5', rskNr: '381 21 32', bredd: 80, hojd: 12.5 },
    { kategori: 'Mini', artNr: '14MFMINI016,5', rskNr: '381 16 51', bredd: 80, hojd: 16.5 },
    { kategori: 'Mini', artNr: '14MFMINI021', rskNr: '381 16 52', bredd: 80, hojd: 21.0 },
    { kategori: 'Mini', artNr: '14MFMINI028', rskNr: '381 16 53', bredd: 80, hojd: 28.0 },
    { kategori: 'Mini', artNr: '14MFMINI038', rskNr: '381 16 54', bredd: 80, hojd: 38.0 },
    { kategori: 'Mini', artNr: '14MFMINI050', rskNr: '381 16 55', bredd: 80, hojd: 50.0 },
    { kategori: 'Mini', artNr: '14MFMINI065', rskNr: '381 21 33', bredd: 80, hojd: 65.0 },
    { kategori: 'Mini', artNr: '14MFMINI075', rskNr: '381 21 34', bredd: 80, hojd: 75.0 },
    { kategori: 'Mini', artNr: '14MFMINI090', rskNr: '381 21 35', bredd: 80, hojd: 90.0 },
    { kategori: 'Mini', artNr: '14MFMINI100', rskNr: '381 21 36', bredd: 80, hojd: 100.0 },
    { kategori: 'Mini', artNr: '14MFMINI125', rskNr: '381 21 37', bredd: 80, hojd: 125.0 }
  ];

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const calculateInnerDiameter = () => {
    const { ytterrorYtterDiameter, sdr } = inputs;
    if (!ytterrorYtterDiameter || !sdr) return null;
    
    const ytterDiam = parseFloat(ytterrorYtterDiameter);
    const sdrValue = parseFloat(sdr);
    
    const vaggtjocklek = ytterDiam / (2 * sdrValue);
    const innerDiam = ytterDiam - (2 * vaggtjocklek);
    
    return innerDiam;
  };

  const getYtterrorInnerDiameter = () => {
    if (inputs.ytterrorInnerDiameter) {
      return parseFloat(inputs.ytterrorInnerDiameter);
    }
    return calculateInnerDiameter();
  };

  const calculateResults = () => {
    const newErrors = {};
    
    // Validera input
    const innerrorYd = parseFloat(inputs.innerrorYtterDiameter);
    if (!innerrorYd || innerrorYd <= 0) {
      newErrors.innerrorYtterDiameter = 'Krävs för att hitta rätt rörstöd';
    }

    const ytterrorInnerDiam = getYtterrorInnerDiameter();
    if (!ytterrorInnerDiam || ytterrorInnerDiam <= 0) {
      newErrors.ytterrorInnerDiameter = 'Krävs för höjdberäkning';
    }

    if (innerrorYd >= ytterrorInnerDiam) {
      newErrors.innerrorYtterDiameter = 'Mediarörets diameter måste vara mindre än skyddsrörets innerdiameter';
    }

    // Validera antal input
    const hasAntalRingar = inputs.antalRingar && parseFloat(inputs.antalRingar) > 0;
    const hasLangdAndCC = inputs.langd && parseFloat(inputs.langd) > 0 && inputs.ccMatt && parseFloat(inputs.ccMatt) > 0;
    
    if (!hasAntalRingar && !hasLangdAndCC) {
      newErrors.antal = 'Ange antingen antal ringar eller längd + CC-mått';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Hitta rätt rörstöd baserat på Mediarörets ytterdiameter
    const matchingRorstod = rorstodData.filter(item => 
      innerrorYd >= item.minYd && innerrorYd <= item.maxYd
    );

    if (matchingRorstod.length === 0) {
      setErrors({ innerrorYtterDiameter: 'Ingen rörstöd hittades för denna dimension' });
      return;
    }

    // Beräkna maxhöjd för klackarna
    const maxHojd = (ytterrorInnerDiam - innerrorYd) / 2;

    // Beräkna antal ringar
    let antalRingar;
    if (hasAntalRingar) {
      antalRingar = parseFloat(inputs.antalRingar);
    } else {
      const langd = parseFloat(inputs.langd) * 1000; // Konvertera från meter till mm
      const ccMatt = parseFloat(inputs.ccMatt) * 1000; // Konvertera från meter till mm
      antalRingar = Math.floor(langd / ccMatt) + 1; // +1 för extra ring
    }

    // Skapa resultat för varje matchande rörstöd
    const results = matchingRorstod.map(rorstod => {
      // Hitta produkter för denna kategori som fungerar med maxhöjd
      const availableProducts = produktData.filter(product => 
        product.kategori === rorstod.kategori && product.hojd <= maxHojd
      );

      // Sortera produkter efter höjd (högsta först för bäst centrering)
      availableProducts.sort((a, b) => b.hojd - a.hojd);

      // Beräkna antal rörstöd
      const antalRorstod = antalRingar * rorstod.antalSegment;

      return {
        ...rorstod,
        maxHojd: Math.round(maxHojd * 10) / 10,
        antalRingar,
        antalRorstod,
        products: availableProducts
      };
    });

    // Sortera resultat: optimala först, sedan efter antal segment
    results.sort((a, b) => {
      if (a.optimal && !b.optimal) return -1;
      if (!a.optimal && b.optimal) return 1;
      return a.antalSegment - b.antalSegment;
    });

    setResults(results);
    setErrors({});
  };

  const findOptimalHeight = (products, maxHojd) => {
    if (products.length === 0) return null;
    
    // Hitta produkten med högsta höjd som inte överstiger maxhöjd
    const sortedProducts = [...products].sort((a, b) => b.hojd - a.hojd);
    return sortedProducts[0];
  };

  const copyResultToClipboard = async (result) => {
    const optimalProduct = findOptimalHeight(result.products, result.maxHojd);
    if (!optimalProduct) return;

    // Skapa tabbseparerad data: RSK-nummer [TAB] Antal rörstöd
    const clipboardText = `${optimalProduct.rskNr}\t${result.antalRorstod}`;
    
    try {
      await navigator.clipboard.writeText(clipboardText);
      setCopiedResult(result.kategori + result.antalSegment); // Unique identifier
      
      // Återställ kopierad-status efter 2 sekunder
      setTimeout(() => {
        setCopiedResult(null);
      }, 2000);
    } catch (err) {
      console.error('Kunde inte kopiera till clipboard:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Calculator className="w-8 h-8" />
          Rörstöd Kalkylator
        </h1>
        <p className="text-gray-600">Beräkna antal rörstöd för ditt projekt - Ibeco</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input sektion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Projektdata</h2>
          
          {/* Skyddsrör */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-3">Skyddsrör</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Innerdiameter (mm)
                </label>
                <input
                  type="number"
                  value={inputs.ytterrorInnerDiameter}
                  onChange={(e) => handleInputChange('ytterrorInnerDiameter', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.ytterrorInnerDiameter ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ange innerdiameter"
                />
                {errors.ytterrorInnerDiameter && (
                  <p className="text-red-500 text-sm mt-1">{errors.ytterrorInnerDiameter}</p>
                )}
              </div>
              
              <div className="text-sm text-gray-600 text-center">eller</div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ytterdiameter (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.ytterrorYtterDiameter}
                    onChange={(e) => handleInputChange('ytterrorYtterDiameter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ytterdiameter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SDR
                  </label>
                  <input
                    type="number"
                    value={inputs.sdr}
                    onChange={(e) => handleInputChange('sdr', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="SDR"
                  />
                </div>
              </div>
              
              {inputs.ytterrorYtterDiameter && inputs.sdr && (
                <div className="text-sm text-blue-600 bg-blue-100 p-2 rounded">
                  Beräknad innerdiameter: {calculateInnerDiameter()?.toFixed(1)} mm
                </div>
              )}
            </div>
          </div>

          {/* Mediarör */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900 mb-3">Mediarör</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ytterdiameter (mm)
              </label>
              <input
                type="number"
                value={inputs.innerrorYtterDiameter}
                onChange={(e) => handleInputChange('innerrorYtterDiameter', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.innerrorYtterDiameter ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ange ytterdiameter"
              />
              {errors.innerrorYtterDiameter && (
                <p className="text-red-500 text-sm mt-1">{errors.innerrorYtterDiameter}</p>
              )}
            </div>
          </div>

          {/* Antal/Längd */}
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-medium text-orange-900 mb-3">Antal rörstöd</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Antal ringar
                </label>
                <input
                  type="number"
                  value={inputs.antalRingar}
                  onChange={(e) => handleInputChange('antalRingar', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Ange antal ringar"
                />
              </div>
              
              <div className="text-sm text-gray-600 text-center">eller</div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Längd (m)
                  </label>
                  <input
                    type="number"
                    value={inputs.langd}
                    onChange={(e) => handleInputChange('langd', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Längd i meter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CC-mått (m)
                  </label>
                  <input
                    type="number"
                    value={inputs.ccMatt}
                    onChange={(e) => handleInputChange('ccMatt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="2"
                  />
                </div>
              </div>
              
              {inputs.langd && inputs.ccMatt && (
                <div className="text-sm text-orange-600 bg-orange-100 p-2 rounded">
                  Beräknade ringar: {Math.floor(parseFloat(inputs.langd || 0) / parseFloat(inputs.ccMatt || 1)) + 1}
                </div>
              )}
              
              {errors.antal && (
                <p className="text-red-500 text-sm">{errors.antal}</p>
              )}
            </div>
          </div>

          <button
            onClick={calculateResults}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Beräkna rörstöd
          </button>
        </div>

        {/* Resultat sektion */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Resultat</h2>
          
          {!results && (
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Fyll i projektdata och klicka på "Beräkna rörstöd" för att se resultatet</p>
            </div>
          )}

          {results && results.length === 0 && (
            <div className="p-6 bg-red-50 rounded-lg text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
              <p className="text-red-600">Inga rörstöd hittades för de angivna dimensionerna</p>
            </div>
          )}

          {results && results.length > 0 && (
            <div className="space-y-4">
              {results.map((result, index) => {
                const optimalProduct = findOptimalHeight(result.products, result.maxHojd);
                
                return (
                  <div key={index} className={`p-4 rounded-lg border-2 ${
                    result.optimal ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {result.kategori}
                          {result.optimal && (
                            <Target className="w-5 h-5 text-green-600" title="Optimalt val" />
                          )}
                        </h3>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {result.antalSegment} segment/ring
                        </span>
                      </div>
                      
                      {result.products.length > 0 && (
                        <button
                          onClick={() => copyResultToClipboard(result)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                          title="Kopiera RSK-nummer och antal till clipboard"
                        >
                          {copiedResult === (result.kategori + result.antalSegment) ? (
                            <>
                              <Check className="w-4 h-4" />
                              Kopierat!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Kopiera
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Antal ringar</p>
                        <p className="font-medium">{result.antalRingar}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Totalt antal rörstöd</p>
                        <p className="font-medium text-blue-600">{result.antalRorstod} st</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600">Max klackhöjd</p>
                      <p className="font-medium">{result.maxHojd} mm</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Tillgängliga produkter:</p>
                      {result.products.length === 0 ? (
                        <p className="text-red-600 text-sm">Inga produkter fungerar med denna klackhöjd</p>
                      ) : (
                        <div className="space-y-2">
                          {result.products.slice(0, 3).map((product, pIndex) => (
                            <div key={pIndex} className={`p-2 rounded border flex items-center justify-between ${
                              product === optimalProduct ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-200'
                            }`}>
                              <div>
                                <p className="font-medium text-sm">RSK: {product.rskNr}</p>
                                <p className="text-xs text-gray-600">{product.artNr}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-sm">H: {product.hojd}mm</p>
                                <p className="text-xs text-gray-600">B: {product.bredd}mm</p>
                                {product === optimalProduct && (
                                  <Target className="w-4 h-4 text-yellow-600 ml-auto" title="Bäst centrering" />
                                )}
                              </div>
                            </div>
                          ))}
                          {result.products.length > 3 && (
                            <p className="text-xs text-gray-500">+{result.products.length - 3} fler alternativ...</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Sammanfattning */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Rekommendation</h3>
                {(() => {
                  const optimalResults = results.filter(r => r.optimal && r.products.length > 0);
                  if (optimalResults.length > 0) {
                    const best = optimalResults[0];
                    const bestProduct = findOptimalHeight(best.products, best.maxHojd);
                    return (
                      <div>
                        <p className="text-blue-800 mb-2">
                          <strong>{best.kategori}</strong> med <strong>{best.antalRorstod} st</strong> rörstöd
                        </p>
                        {bestProduct && (
                          <p className="text-sm text-blue-700">
                            Rekommenderad produkt: <strong>{bestProduct.artNr}</strong> (H: {bestProduct.hojd}mm)
                          </p>
                        )}
                      </div>
                    );
                  } else {
                    const anyAvailable = results.find(r => r.products.length > 0);
                    if (anyAvailable) {
                      const product = findOptimalHeight(anyAvailable.products, anyAvailable.maxHojd);
                      return (
                        <div>
                          <p className="text-blue-800 mb-2">
                            <strong>{anyAvailable.kategori}</strong> med <strong>{anyAvailable.antalRorstod} st</strong> rörstöd
                          </p>
                          {product && (
                            <p className="text-sm text-blue-700">
                              Tillgänglig produkt: <strong>{product.artNr}</strong> (H: {product.hojd}mm)
                            </p>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <p className="text-red-600">
                          Inga produkter fungerar med den beräknade klackhöjden. Kontrollera dimensionerna.
                        </p>
                      );
                    }
                  }
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RorstodCalculator;
