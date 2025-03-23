import fs from 'fs';
import path from 'path';

const baseDir = '.';

const fileContents = {
  'controllers/performanceController.js': `import Performance from '../models/Performance.js';

export const getMyPerformanceReview = async (req, res) => {
  try {
    const review = await Performance.findOne({ userId: req.user.id });
    if (!review) return res.status(404).json({ error: 'No review found' });
    res.json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const givePerformanceReview = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { review, rating } = req.body;
    const newReview = new Performance({ userId: employeeId, review, rating });
    await newReview.save();
    res.json({ message: 'Review submitted successfully', newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};`,

  'models/Performance.js': `import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true }
});

const Performance = mongoose.model('Performance', performanceSchema);
export default Performance;`,

  'services/performanceService.js': `import { getMyPerformanceReview, givePerformanceReview } from '../controllers/performanceController.js';

const performanceService = {
  PerformanceService: {
    PerformanceServicePort: {
      GetMyPerformanceReview: async (args, callback) => {
        const result = await getMyPerformanceReview({ user: { id: args.userId } }, callback);
      },
      GivePerformanceReview: async (args, callback) => {
        const result = await givePerformanceReview({ params: { employeeId: args.employeeId }, body: { review: args.review, rating: args.rating } }, callback);
      }
    }
  }
};

export default performanceService;`,

  'wsdl/performanceService.wsdl': `<?xml version="1.0"?>
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
    xmlns:tns="http://example.com/performance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    targetNamespace="http://example.com/performance">

  <types>
    <xsd:schema targetNamespace="http://example.com/performance">
      <xsd:element name="GetMyPerformanceReviewRequest">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="userId" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="GetMyPerformanceReviewResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="review" type="xsd:string"/>
            <xsd:element name="rating" type="xsd:int"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </types>

  <message name="GetMyPerformanceReviewRequestMessage">
    <part name="parameters" element="tns:GetMyPerformanceReviewRequest"/>
  </message>
  <message name="GetMyPerformanceReviewResponseMessage">
    <part name="parameters" element="tns:GetMyPerformanceReviewResponse"/>
  </message>

  <portType name="PerformanceServicePort">
    <operation name="GetMyPerformanceReview">
      <input message="tns:GetMyPerformanceReviewRequestMessage"/>
      <output message="tns:GetMyPerformanceReviewResponseMessage"/>
    </operation>
  </portType>

  <binding name="PerformanceServiceBinding" type="tns:PerformanceServicePort">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="GetMyPerformanceReview">
      <soap:operation soapAction="http://example.com/performance/GetMyPerformanceReview"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>

  <service name="PerformanceService">
    <port name="PerformanceServicePort" binding="tns:PerformanceServiceBinding">
      <soap:address location="http://localhost:5000/soap"/>
    </port>
  </service>
</definitions>`
};

// Write contents to files
const writeFiles = (base, fileContents) => {
  Object.entries(fileContents).forEach(([filePath, content]) => {
    const fullPath = path.join(base, filePath);
    fs.writeFileSync(fullPath, content);
    console.log(`Written to: ${fullPath}`);
  });
};

writeFiles(baseDir, fileContents);
