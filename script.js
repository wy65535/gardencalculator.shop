// Garden Calculator Functions

// Plant Quantity Calculator
function calculatePlantQuantity() {
    const length = parseFloat(document.getElementById('garden-length').value);
    const width = parseFloat(document.getElementById('garden-width').value);
    const lengthUnit = document.getElementById('length-unit').value;
    const widthUnit = document.getElementById('width-unit').value;
    const spacingUnit = document.getElementById('spacing-unit').value;
    const plantTypeSpacing = document.getElementById('plant-type-spacing').value;
    
    let spacing = plantTypeSpacing ? parseFloat(plantTypeSpacing) : parseFloat(document.getElementById('plant-spacing').value);
    
    if (!length || !width || !spacing) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Convert all to inches
    const lengthInches = convertToInches(length, lengthUnit);
    const widthInches = convertToInches(width, widthUnit);
    const spacingInches = plantTypeSpacing ? spacing : convertToInches(spacing, spacingUnit);
    
    // Calculate area
    const areaInches = lengthInches * widthInches;
    const areaFeet = areaInches / 144;
    
    // Calculate plants per row and column
    const plantsPerLength = Math.floor(lengthInches / spacingInches);
    const plantsPerWidth = Math.floor(widthInches / spacingInches);
    const totalPlants = plantsPerLength * plantsPerWidth;
    
    // Calculate space efficiency
    const spaceUsed = totalPlants * (spacingInches * spacingInches);
    const efficiency = (spaceUsed / areaInches * 100).toFixed(1);
    
    // Display results
    const resultBox = document.getElementById('plant-quantity-result');
    const resultContent = resultBox.querySelector('.result-content');
    
    resultContent.innerHTML = `
        <p><strong>Garden Bed Size:</strong> ${length} × ${width} ${lengthUnit} (${areaFeet.toFixed(2)} sq ft)</p>
        <p><strong>Plant Spacing:</strong> ${spacingInches} inches</p>
        <p><strong>Layout:</strong> ${plantsPerLength} plants × ${plantsPerWidth} plants</p>
        <p><strong>Total Plants:</strong> <span class="result-highlight">${totalPlants} plants</span></p>
        <p><strong>Space Efficiency:</strong> ${efficiency}% of bed area utilized</p>
        <div style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 8px;">
            <strong>💡 Tips:</strong>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                <li>Consider companion planting to maximize space</li>
                <li>Leave pathways between beds for easy access</li>
                <li>Adjust spacing based on plant variety and growing conditions</li>
            </ul>
        </div>
    `;
    
    resultBox.style.display = 'block';
}

// Soil Calculator
function calculateSoil() {
    const length = parseFloat(document.getElementById('bed-length').value);
    const width = parseFloat(document.getElementById('bed-width').value);
    const depth = parseFloat(document.getElementById('bed-depth').value);
    const lengthUnit = document.getElementById('bed-length-unit').value;
    const widthUnit = document.getElementById('bed-width-unit').value;
    const depthUnit = document.getElementById('bed-depth-unit').value;
    const soilMix = document.getElementById('soil-mix').value;
    
    if (!length || !width || !depth) {
        alert('Please fill in all dimensions');
        return;
    }
    
    // Convert all to feet
    const lengthFeet = convertToFeet(length, lengthUnit);
    const widthFeet = convertToFeet(width, widthUnit);
    const depthFeet = convertToFeet(depth, depthUnit);
    
    // Calculate volume
    const volumeCubicFeet = lengthFeet * widthFeet * depthFeet;
    const volumeCubicYards = volumeCubicFeet / 27;
    const volumeGallons = volumeCubicFeet * 7.48;
    const bags40lb = Math.ceil(volumeCubicFeet * 1.5); // Approximate
    
    // Calculate mix components
    let mixBreakdown = '';
    switch(soilMix) {
        case 'standard':
            mixBreakdown = `
                <p><strong>Standard Mix (60/30/10):</strong></p>
                <ul style="margin-left: 1.5rem;">
                    <li>Topsoil: ${(volumeCubicFeet * 0.6).toFixed(1)} cu ft (${(volumeCubicYards * 0.6).toFixed(2)} cu yd)</li>
                    <li>Compost: ${(volumeCubicFeet * 0.3).toFixed(1)} cu ft (${(volumeCubicYards * 0.3).toFixed(2)} cu yd)</li>
                    <li>Vermiculite/Perlite: ${(volumeCubicFeet * 0.1).toFixed(1)} cu ft (${Math.ceil(volumeCubicFeet * 0.1 / 2)} bags)</li>
                </ul>
            `;
            break;
        case 'veggie':
            mixBreakdown = `
                <p><strong>Vegetable Garden Mix (50/40/10):</strong></p>
                <ul style="margin-left: 1.5rem;">
                    <li>Topsoil: ${(volumeCubicFeet * 0.5).toFixed(1)} cu ft (${(volumeCubicYards * 0.5).toFixed(2)} cu yd)</li>
                    <li>Compost: ${(volumeCubicFeet * 0.4).toFixed(1)} cu ft (${(volumeCubicYards * 0.4).toFixed(2)} cu yd)</li>
                    <li>Perlite: ${(volumeCubicFeet * 0.1).toFixed(1)} cu ft (${Math.ceil(volumeCubicFeet * 0.1 / 2)} bags)</li>
                </ul>
            `;
            break;
        case 'mel':
            mixBreakdown = `
                <p><strong>Mel's Mix (33/33/33):</strong></p>
                <ul style="margin-left: 1.5rem;">
                    <li>Compost: ${(volumeCubicFeet * 0.33).toFixed(1)} cu ft (${(volumeCubicYards * 0.33).toFixed(2)} cu yd)</li>
                    <li>Peat Moss: ${(volumeCubicFeet * 0.33).toFixed(1)} cu ft (${Math.ceil(volumeCubicFeet * 0.33 / 3.8)} bales)</li>
                    <li>Vermiculite: ${(volumeCubicFeet * 0.33).toFixed(1)} cu ft (${Math.ceil(volumeCubicFeet * 0.33 / 2)} bags)</li>
                </ul>
            `;
            break;
        default:
            mixBreakdown = '<p>Select a soil mix type for detailed breakdown</p>';
    }
    
    // Display results
    const resultBox = document.getElementById('soil-result');
    const resultContent = resultBox.querySelector('.result-content');
    
    resultContent.innerHTML = `
        <p><strong>Bed Dimensions:</strong> ${length} ${lengthUnit} × ${width} ${widthUnit} × ${depth} ${depthUnit}</p>
        <p><strong>Total Volume Needed:</strong></p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
            <li><span class="result-highlight">${volumeCubicFeet.toFixed(2)} cubic feet</span></li>
            <li>${volumeCubicYards.toFixed(2)} cubic yards</li>
            <li>${volumeGallons.toFixed(0)} gallons</li>
            <li>Approximately ${bags40lb} bags of 40-lb bagged soil</li>
        </ul>
        ${mixBreakdown}
        <div style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 8px;">
            <strong>💡 Shopping Tips:</strong>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                <li>Buy in bulk (cubic yards) for better prices on large beds</li>
                <li>Use bagged soil for small beds or top-dressing</li>
                <li>Mix in 25-30% compost for optimal nutrients</li>
                <li>Consider buying soil one season ahead to let it "cook"</li>
            </ul>
        </div>
    `;
    
    resultBox.style.display = 'block';
}

// Planting Schedule Calculator
function calculatePlantingSchedule() {
    const location = document.getElementById('location').value;
    const zone = document.getElementById('hardiness-zone').value;
    const lastFrost = document.getElementById('last-frost').value;
    const firstFrost = document.getElementById('first-frost').value;
    
    if (!zone || !lastFrost || !firstFrost) {
        alert('Please fill in zone and frost dates');
        return;
    }
    
    const lastFrostDate = new Date(lastFrost);
    const firstFrostDate = new Date(firstFrost);
    
    // Calculate growing season length
    const seasonLength = Math.floor((firstFrostDate - lastFrostDate) / (1000 * 60 * 60 * 24));
    
    // Define planting schedules relative to last frost
    const plantingSchedule = [
        { crop: 'Peas', indoor: -8, outdoor: -6, notes: 'Cold hardy, plant early' },
        { crop: 'Spinach', indoor: -6, outdoor: -4, notes: 'Cold tolerant' },
        { crop: 'Lettuce', indoor: -6, outdoor: -4, notes: 'Cool season crop' },
        { crop: 'Broccoli', indoor: -6, outdoor: -2, notes: 'Transplant 2 weeks before last frost' },
        { crop: 'Cabbage', indoor: -6, outdoor: -2, notes: 'Cold hardy' },
        { crop: 'Carrots', indoor: 0, outdoor: -2, notes: 'Direct sow early' },
        { crop: 'Radishes', indoor: 0, outdoor: -3, notes: 'Quick maturing' },
        { crop: 'Tomatoes', indoor: -8, outdoor: 2, notes: 'Wait until soil warms to 60°F' },
        { crop: 'Peppers', indoor: -10, outdoor: 2, notes: 'Needs warm soil' },
        { crop: 'Cucumbers', indoor: -4, outdoor: 2, notes: 'Frost sensitive' },
        { crop: 'Squash', indoor: -4, outdoor: 2, notes: 'Warm season crop' },
        { crop: 'Beans', indoor: 0, outdoor: 1, notes: 'Direct sow after frost' },
        { crop: 'Corn', indoor: 0, outdoor: 2, notes: 'Soil must be 60°F+' },
    ];
    
    let scheduleHTML = '<div style="overflow-x: auto;"><table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">';
    scheduleHTML += '<thead><tr style="background-color: #2ecc71; color: white;"><th style="padding: 1rem; text-align: left;">Crop</th><th style="padding: 1rem;">Indoor Start</th><th style="padding: 1rem;">Transplant/Direct Sow</th><th style="padding: 1rem; text-align: left;">Notes</th></tr></thead><tbody>';
    
    plantingSchedule.forEach((plant, index) => {
        const indoorDate = new Date(lastFrostDate);
        indoorDate.setDate(indoorDate.getDate() + (plant.indoor * 7));
        
        const outdoorDate = new Date(lastFrostDate);
        outdoorDate.setDate(outdoorDate.getDate() + (plant.outdoor * 7));
        
        const bgColor = index % 2 === 0 ? '#f8f9fa' : 'white';
        scheduleHTML += `<tr style="background-color: ${bgColor};">
            <td style="padding: 1rem; font-weight: 600;">${plant.crop}</td>
            <td style="padding: 1rem; text-align: center;">${plant.indoor !== 0 ? indoorDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}</td>
            <td style="padding: 1rem; text-align: center;">${outdoorDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
            <td style="padding: 1rem;">${plant.notes}</td>
        </tr>`;
    });
    
    scheduleHTML += '</tbody></table></div>';
    
    const resultBox = document.getElementById('schedule-result');
    const resultContent = resultBox.querySelector('.result-content');
    
    resultContent.innerHTML = `
        ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
        <p><strong>USDA Zone:</strong> ${zone}</p>
        <p><strong>Last Spring Frost:</strong> ${lastFrostDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <p><strong>First Fall Frost:</strong> ${firstFrostDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <p><strong>Growing Season:</strong> <span class="result-highlight">${seasonLength} days</span></p>
        <div style="margin: 1.5rem 0;">
            ${scheduleHTML}
        </div>
        <div style="margin-top: 1rem; padding: 1rem; background: white; border-radius: 8px;">
            <strong>📅 Planting Tips:</strong>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                <li>These dates are guidelines - adjust based on actual weather</li>
                <li>Start seeds indoors under grow lights or in sunny windows</li>
                <li>Harden off transplants for 7-10 days before planting</li>
                <li>Use row covers for early season protection</li>
                <li>Plant succession crops every 2-3 weeks for continuous harvest</li>
            </ul>
        </div>
    `;
    
    resultBox.style.display = 'block';
}

// Companion Planting Guide
function showCompanionPlants() {
    const mainPlant = document.getElementById('main-plant').value;
    
    if (!mainPlant) {
        alert('Please select a plant');
        return;
    }
    
    const companionData = {
        tomatoes: {
            good: ['Basil', 'Carrots', 'Marigolds', 'Nasturtiums', 'Onions', 'Parsley', 'Peppers', 'Asparagus'],
            bad: ['Cabbage', 'Corn', 'Potatoes', 'Fennel', 'Kohlrabi', 'Brassicas'],
            benefits: 'Basil improves flavor and repels pests. Marigolds deter nematodes. Carrots loosen soil for tomato roots.'
        },
        peppers: {
            good: ['Basil', 'Onions', 'Spinach', 'Tomatoes', 'Carrots', 'Parsley'],
            bad: ['Beans', 'Kohlrabi', 'Fennel', 'Brassicas'],
            benefits: 'Basil enhances flavor and repels aphids. Onions deter pests. Plant with tomatoes for efficient space use.'
        },
        lettuce: {
            good: ['Carrots', 'Radishes', 'Strawberries', 'Cucumbers', 'Onions', 'Beets'],
            bad: ['Parsley', 'Celery'],
            benefits: 'Radishes break up soil. Tall plants provide afternoon shade. Carrots and lettuce use different soil depths.'
        },
        carrots: {
            good: ['Onions', 'Leeks', 'Rosemary', 'Sage', 'Tomatoes', 'Lettuce', 'Peas'],
            bad: ['Dill', 'Parsnips', 'Celery'],
            benefits: 'Onions and leeks repel carrot flies. Rosemary and sage mask carrot scent from pests.'
        },
        beans: {
            good: ['Corn', 'Cucumbers', 'Potatoes', 'Radishes', 'Strawberries', 'Carrots'],
            bad: ['Onions', 'Garlic', 'Peppers', 'Fennel', 'Sunflowers'],
            benefits: 'Beans fix nitrogen in soil. Part of "Three Sisters" with corn and squash. Corn provides support for pole beans.'
        },
        peas: {
            good: ['Carrots', 'Turnips', 'Radishes', 'Cucumbers', 'Corn', 'Beans'],
            bad: ['Onions', 'Garlic', 'Gladiolus'],
            benefits: 'Peas fix nitrogen. Radishes deter pea beetles. Plant with carrots to maximize space.'
        },
        cucumbers: {
            good: ['Beans', 'Corn', 'Peas', 'Radishes', 'Sunflowers', 'Lettuce'],
            bad: ['Potatoes', 'Aromatic herbs', 'Sage'],
            benefits: 'Radishes repel cucumber beetles. Corn and sunflowers provide shade. Beans enrich soil.'
        },
        squash: {
            good: ['Corn', 'Beans', 'Peas', 'Radishes', 'Marigolds', 'Nasturtiums'],
            bad: ['Potatoes', 'Brassicas'],
            benefits: 'Part of "Three Sisters" garden. Large leaves suppress weeds. Nasturtiums repel squash bugs.'
        },
        corn: {
            good: ['Beans', 'Squash', 'Cucumbers', 'Peas', 'Pumpkins', 'Melons'],
            bad: ['Tomatoes', 'Celery', 'Brassicas'],
            benefits: 'Provides support for climbing beans. Squash shades soil. Beans add nitrogen corn needs.'
        },
        broccoli: {
            good: ['Beets', 'Onions', 'Potatoes', 'Celery', 'Dill', 'Rosemary', 'Sage'],
            bad: ['Tomatoes', 'Peppers', 'Strawberries', 'Pole beans'],
            benefits: 'Aromatic herbs repel cabbage moths. Onions deter aphids. Beets don\'t compete for nutrients.'
        },
        cabbage: {
            good: ['Onions', 'Celery', 'Dill', 'Potatoes', 'Beets', 'Thyme', 'Sage'],
            bad: ['Tomatoes', 'Peppers', 'Strawberries', 'Pole beans'],
            benefits: 'Celery and onions repel cabbage moths. Herbs confuse pests. Potatoes don\'t compete.'
        },
        onions: {
            good: ['Beets', 'Carrots', 'Lettuce', 'Tomatoes', 'Peppers', 'Brassicas'],
            bad: ['Beans', 'Peas', 'Sage', 'Asparagus'],
            benefits: 'Strong scent deters many pests. Repels aphids and carrot flies. Doesn\'t compete for space.'
        },
        garlic: {
            good: ['Tomatoes', 'Roses', 'Carrots', 'Beets', 'Fruit trees'],
            bad: ['Beans', 'Peas', 'Sage', 'Asparagus'],
            benefits: 'Natural fungicide and pesticide. Repels aphids and beetles. Improves growth of roses.'
        },
        spinach: {
            good: ['Strawberries', 'Peas', 'Beans', 'Celery', 'Cauliflower', 'Eggplant'],
            bad: ['Potatoes', 'Fennel'],
            benefits: 'Provides ground cover. Saponins in spinach help repel pests. Complements tall plants.'
        },
        radishes: {
            good: ['Lettuce', 'Peas', 'Cucumbers', 'Squash', 'Carrots', 'Beans'],
            bad: ['Hyssop', 'Grapes'],
            benefits: 'Quick harvest frees space. Breaks up compacted soil. Deters cucumber beetles and squash borers.'
        }
    };
    
    const data = companionData[mainPlant];
    const plantName = mainPlant.charAt(0).toUpperCase() + mainPlant.slice(1);
    
    const resultBox = document.getElementById('companion-result');
    const resultContent = resultBox.querySelector('.result-content');
    
    let goodPlantsHTML = '<div class="plant-list">';
    data.good.forEach(plant => {
        goodPlantsHTML += `<span class="plant-tag good">✓ ${plant}</span>`;
    });
    goodPlantsHTML += '</div>';
    
    let badPlantsHTML = '<div class="plant-list">';
    data.bad.forEach(plant => {
        badPlantsHTML += `<span class="plant-tag bad">✗ ${plant}</span>`;
    });
    badPlantsHTML += '</div>';
    
    resultContent.innerHTML = `
        <h4 style="color: #2ecc71; margin-bottom: 1rem;">Companion Plants for ${plantName}</h4>
        
        <div class="companion-section">
            <h5>✅ Good Companions (Plant Together)</h5>
            ${goodPlantsHTML}
        </div>
        
        <div class="companion-section avoid">
            <h5>⚠️ Avoid Planting With</h5>
            ${badPlantsHTML}
        </div>
        
        <div style="margin-top: 1.5rem; padding: 1.5rem; background: white; border-radius: 8px; border-left: 4px solid #2ecc71;">
            <strong>🌱 Benefits:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.8;">${data.benefits}</p>
        </div>
        
        <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
            <strong>💡 Companion Planting Tips:</strong>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                <li>Rotate companion plantings each season to prevent soil depletion</li>
                <li>Mix aromatic herbs throughout the garden to confuse pests</li>
                <li>Plant flowers like marigolds and nasturtiums as pest deterrents</li>
                <li>Consider plant heights - tall plants can shade shorter ones</li>
                <li>Group plants with similar water and nutrient needs</li>
            </ul>
        </div>
    `;
    
    resultBox.style.display = 'block';
}

// Harvest Time Calculator
function calculateHarvestTime() {
    const plantVariety = document.getElementById('plant-variety').value;
    const plantingDate = document.getElementById('planting-date').value;
    
    if (!plantVariety || !plantingDate) {
        alert('Please select plant type and planting date');
        return;
    }
    
    const harvestData = {
        tomatoes: { min: 60, max: 85, tips: 'Pick when fully colored but still firm. Harvest regularly to encourage more production.' },
        peppers: { min: 60, max: 90, tips: 'Can harvest green or wait for color change. Peppers sweeten as they ripen.' },
        lettuce: { min: 30, max: 60, tips: 'Harvest outer leaves for continuous production. Harvest entire head before bolting.' },
        carrots: { min: 50, max: 80, tips: 'Can harvest baby carrots early. Full size varies by variety. Pull when shoulders appear above soil.' },
        beans: { min: 50, max: 60, tips: 'Pick when pods are firm but before seeds bulge. Harvest every 2-3 days for continuous production.' },
        peas: { min: 50, max: 70, tips: 'Harvest snap peas when pods are plump. Shell peas when pods are full but still bright green.' },
        cucumbers: { min: 50, max: 70, tips: 'Harvest when 6-8 inches for slicing, 3-5 inches for pickling. Don\'t let them get too large.' },
        squash: { min: 45, max: 60, tips: 'Summer squash: harvest when 6-8 inches. Winter squash: wait until rind is hard.' },
        corn: { min: 60, max: 100, tips: 'Harvest when silks turn brown and kernels squirt milky juice when pierced.' },
        broccoli: { min: 50, max: 70, tips: 'Cut main head when buds are tight. Side shoots will continue producing.' },
        cabbage: { min: 60, max: 105, tips: 'Harvest when heads are firm and before splitting. Can withstand light frost.' },
        radishes: { min: 20, max: 30, tips: 'Quick growing. Harvest when roots are 1 inch diameter. Don\'t let them get too large.' },
        spinach: { min: 40, max: 50, tips: 'Harvest outer leaves or entire plant. Best before warm weather causes bolting.' },
        zucchini: { min: 35, max: 55, tips: 'Harvest when 6-8 inches long. Check daily - they grow fast!' }
    };
    
    const data = harvestData[plantVariety];
    const plantDate = new Date(plantingDate);
    
    const minHarvestDate = new Date(plantDate);
    minHarvestDate.setDate(minHarvestDate.getDate() + data.min);
    
    const maxHarvestDate = new Date(plantDate);
    maxHarvestDate.setDate(maxHarvestDate.getDate() + data.max);
    
    const today = new Date();
    const daysUntilHarvest = Math.floor((minHarvestDate - today) / (1000 * 60 * 60 * 24));
    
    const plantName = plantVariety.charAt(0).toUpperCase() + plantVariety.slice(1);
    
    const resultBox = document.getElementById('harvest-result');
    const resultContent = resultBox.querySelector('.result-content');
    
    let countdownHTML = '';
    if (daysUntilHarvest > 0) {
        countdownHTML = `<p><strong>Days Until Harvest:</strong> <span class="result-highlight">${daysUntilHarvest} days</span></p>`;
    } else if (daysUntilHarvest < 0 && Math.abs(daysUntilHarvest) < data.max - data.min) {
        countdownHTML = `<p style="color: #f39c12; font-weight: 600;">🎉 Your ${plantName} should be ready for harvest now!</p>`;
    } else {
        countdownHTML = `<p style="color: #e74c3c; font-weight: 600;">⚠️ Your ${plantName} may be past optimal harvest time. Check plants immediately.</p>`;
    }
    
    resultContent.innerHTML = `
        <p><strong>Crop:</strong> ${plantName}</p>
        <p><strong>Planting Date:</strong> ${plantDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <p><strong>Days to Maturity:</strong> ${data.min}-${data.max} days</p>
        <p><strong>Harvest Window:</strong> ${minHarvestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${maxHarvestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        ${countdownHTML}
        
        <div style="margin-top: 1.5rem; padding: 1.5rem; background: white; border-radius: 8px; border-left: 4px solid #2ecc71;">
            <strong>🌿 Harvest Tips for ${plantName}:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.8;">${data.tips}</p>
        </div>
        
        <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
            <strong>📋 General Harvest Guidelines:</strong>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                <li>Harvest in the morning after dew dries for best flavor</li>
                <li>Use clean, sharp tools to avoid plant damage</li>
                <li>Handle produce gently to prevent bruising</li>
                <li>Regular harvesting encourages more production</li>
                <li>Cool harvested vegetables immediately for longer storage</li>
            </ul>
        </div>
    `;
    
    resultBox.style.display = 'block';
}

// Watering Calculator
function calculateWatering() {
    const area = parseFloat(document.getElementById('garden-area').value);
    const areaUnit = document.getElementById('area-unit').value;
    const climate = document.getElementById('climate').value;
    const waterNeed = document.getElementById('plant-water-need').value;
    
    if (!area || !climate || !waterNeed) {
        alert('Please fill in all fields');
        return;
    }
    
    // Convert to square feet
    const areaSqFt = areaUnit === 'sqm' ? area * 10.764 : area;
    
    // Base water amounts in inches per week
    const climateWater = {
        'hot-dry': 1.5,
        'warm': 1.0,
        'moderate': 0.75,
        'cool': 0.5
    };
    
    const plantMultiplier = {
        'high': 1.3,
        'medium': 1.0,
        'low': 0.7
    };
    
    const baseWater = climateWater[climate];
    const adjustedWater = baseWater * plantMultiplier[waterNeed];
    
    // Calculate volume
    // 1 inch of water over 1 sq ft = 0.623 gallons
    const gallonsPerWeek = areaSqFt * adjustedWater * 0.623;
    const gallonsPerDay = gallonsPerWeek / 7;
    const litersPerWeek = gallonsPerWeek * 3.785;
    
    // Calculate watering schedule
    const minutesPerWeek = (gallonsPerWeek / 2).toFixed(0); // Assuming 2 GPM flow rate
    
    const resultBox = document.getElementById('watering-result');
    const resultContent = resultBox.querySelector('.result-content');
    
    let scheduleRecommendation = '';
    if (climate === 'hot-dry') {
        scheduleRecommendation = 'Water daily in early morning or evening. Deep watering is essential.';
    } else if (climate === 'warm') {
        scheduleRecommendation = 'Water 3-4 times per week. Deep watering every other day works well.';
    } else if (climate === 'moderate') {
        scheduleRecommendation = 'Water 2-3 times per week. Adjust based on rainfall.';
    } else {
        scheduleRecommendation = 'Water 1-2 times per week. Monitor soil moisture levels.';
    }
    
    resultContent.innerHTML = `
        <p><strong>Garden Area:</strong> ${area} ${areaUnit} (${areaSqFt.toFixed(1)} sq ft)</p>
        <p><strong>Climate Zone:</strong> ${climate.replace('-', ' & ').replace(/\b\w/g, l => l.toUpperCase())}</p>
        <p><strong>Plant Water Needs:</strong> ${waterNeed.charAt(0).toUpperCase() + waterNeed.slice(1)}</p>
        
        <div style="margin: 1.5rem 0; padding: 1.5rem; background: white; border-radius: 8px;">
            <h5 style="color: #2ecc71; margin-bottom: 1rem;">💧 Weekly Water Requirements:</h5>
            <p><strong>Total Water Needed:</strong></p>
            <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                <li><span class="result-highlight">${gallonsPerWeek.toFixed(1)} gallons per week</span></li>
                <li>${gallonsPerDay.toFixed(1)} gallons per day (if watering daily)</li>
                <li>${litersPerWeek.toFixed(1)} liters per week</li>
                <li>${adjustedWater.toFixed(2)} inches of water per week</li>
            </ul>
        </div>
        
        <div style="margin: 1rem 0; padding: 1.5rem; background: #e8f5e9; border-radius: 8px;">
            <strong>📅 Watering Schedule:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.8;">${scheduleRecommendation}</p>
            <p style="margin-top: 0.5rem;"><strong>Estimated Time:</strong> ${minutesPerWeek} minutes per week (with standard hose)</p>
        </div>
        
        <div style="margin-top: 1rem; padding: 1rem; background: #fff3cd; border-radius: 8px;">
            <strong>💡 Watering Tips:</strong>
            <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
                <li><strong>Best Time:</strong> Water in early morning (6-10 AM) to reduce evaporation and disease</li>
                <li><strong>Deep Watering:</strong> Water deeply and less frequently to encourage deep root growth</li>
                <li><strong>Soil Check:</strong> Water when top 1-2 inches of soil is dry to touch</li>
                <li><strong>Mulch:</strong> Apply 2-3 inches of mulch to retain moisture and reduce watering by 25%</li>
                <li><strong>Drip Irrigation:</strong> Consider drip systems for 50% water savings and better plant health</li>
                <li><strong>Rain Gauge:</strong> Measure rainfall and adjust watering accordingly</li>
                <li><strong>Avoid Overhead:</strong> Water at soil level to prevent fungal diseases on leaves</li>
            </ul>
        </div>
    `;
    
    resultBox.style.display = 'block';
}

// Helper functions
function convertToInches(value, unit) {
    switch(unit) {
        case 'feet': return value * 12;
        case 'meters': return value * 39.37;
        case 'cm': return value * 0.3937;
        case 'inches': return value;
        default: return value;
    }
}

function convertToFeet(value, unit) {
    switch(unit) {
        case 'meters': return value * 3.28084;
        case 'inches': return value / 12;
        case 'cm': return value * 0.0328084;
        case 'feet': return value;
        default: return value;
    }
}

// Auto-update plant spacing when plant type is selected
document.addEventListener('DOMContentLoaded', function() {
    const plantTypeSelect = document.getElementById('plant-type-spacing');
    const plantSpacingInput = document.getElementById('plant-spacing');
    const spacingUnitSelect = document.getElementById('spacing-unit');
    
    if (plantTypeSelect) {
        plantTypeSelect.addEventListener('change', function() {
            if (this.value) {
                plantSpacingInput.value = this.value;
                spacingUnitSelect.value = 'inches';
                plantSpacingInput.disabled = true;
                spacingUnitSelect.disabled = true;
            } else {
                plantSpacingInput.disabled = false;
                spacingUnitSelect.disabled = false;
            }
        });
    }
    
    // Set default dates for planting schedule
    const lastFrostInput = document.getElementById('last-frost');
    const firstFrostInput = document.getElementById('first-frost');
    
    if (lastFrostInput && firstFrostInput) {
        const today = new Date();
        const currentYear = today.getFullYear();
        
        // Default last frost to mid-April
        const defaultLastFrost = new Date(currentYear, 3, 15);
        lastFrostInput.value = defaultLastFrost.toISOString().split('T')[0];
        
        // Default first frost to mid-October
        const defaultFirstFrost = new Date(currentYear, 9, 15);
        firstFrostInput.value = defaultFirstFrost.toISOString().split('T')[0];
    }
    
    // Set default planting date to today
    const plantingDateInput = document.getElementById('planting-date');
    if (plantingDateInput) {
        const today = new Date();
        plantingDateInput.value = today.toISOString().split('T')[0];
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

